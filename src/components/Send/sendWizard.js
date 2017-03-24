import log from 'loglevel';
import React from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {browserHistory} from 'react-router';
import {Step, Stepper, StepLabel} from 'material-ui/Stepper';
import BigNumber from 'bignumber.js';

import {receiveTransactions} from '../../redux/transactionsActions';

import Waves from 'waves.js/dist/waves';
import {blockchain} from '../../blockchain';

import {client} from '../../redux/api';
import {KnownAssets} from '../../domain/assets';

import SendForm from './sendForm';
import ConfirmForm from './confirmForm';
import PublishForm from './publishForm';

const SEND_FORM = 'SEND_FORM';
const CONFIRM_FORM = 'CONFIRM_FORM';
const PUBLISH_FORM = 'PUBLISH_FORM';

const FEE = 100000;
const FEE_ASSET_ID = null;

class SendWizard extends React.Component {

  constructor(props) {
    super(props);
    const {address} = this.props.params;

    // TODO: search sender account

    this.state = {
      page: SEND_FORM,
      address: address
    };
  }

  confirmTx = (values) => {

    const assetBalance = this.props.balances.get(this.state.address).items.find(b => b.assetId === values['asset']);

    const amount = new BigNumber(values['amount']).mul(Math.pow(10, assetBalance.assetDecimals)).toNumber();

    const recipient = values['recipient'];
    const fee = FEE;
    const feeAssetId = FEE_ASSET_ID;

    const assetId = (values['asset'] === KnownAssets.Waves.assetId) ? null : values['asset'];
    const timestamp = Date.now();

    const sendAccount = this.props.wallet.accounts.find(a => a.address === this.state.address);
    const pubKeyBase58 = Waves.Base58.encode(sendAccount.publicKey);

    const attachment = values['attachment'];
    const attachmentBase58 = Waves.Base58.encode(Waves.Utils.utf8ToBytes(values['attachment']));

    // Sign tx
    const unsignedTx = blockchain.createAssetTransfer(pubKeyBase58, recipient, assetId, amount, feeAssetId, fee,
      timestamp, attachmentBase58);

    const signedTx = Waves.signTransaction(unsignedTx, sendAccount.privateKey);

    // create transfer request
    const signedRequest = Waves.HttpApi.AssetTransferTransaction.fromSigned(signedTx);

    this.setState({
      page: CONFIRM_FORM,
      signedTx: signedRequest,
      tx: {
        id: Waves.Base58.encode(signedTx.tx.id),
        assetId: assetId,
        assetName: assetBalance.assetName,
        assetDecimals: assetBalance.assetDecimals,
        amount: amount,
        sender: this.state.address,
        senderPublicKey: pubKeyBase58,
        recipient: recipient,
        fee: fee,
        feeAssetId: feeAssetId,
        feeAssetName: KnownAssets.Waves.name,
        feeAssetDecimals: KnownAssets.Waves.decimals,
        timestamp: timestamp,
        signature: signedRequest.signature,
        attachment: attachment
      }
    });
  };

  publishTx = () => {
    const address = this.state.address;
    const redirectUrl = `/wallet/account/${address}`;

    client.publishAssetTransfer(this.state.signedTx)
      .then(publishedTx => {
        log.debug('Tx Published: ', publishedTx);

        publishedTx.unconfirmed = true;
        this.props.dispatch(receiveTransactions(address, [publishedTx]));

        browserHistory.push(redirectUrl);
      })
      .catch(error => {
        log.error(error);
        alert(error);
      });
    //this.setState({page: PUBLISH_FORM})
  };

  returnToSendForm = () => {
    this.setState({page: SEND_FORM})
  };

  cancelSend = () => {
    browserHistory.push(`/wallet/account/${this.props.params.address}`);
  };

  stepIndex = (page) => {
    switch (page) {
      case SEND_FORM:
        return 0;
      case CONFIRM_FORM:
        return 1;
      case PUBLISH_FORM:
        return 2;
      default:
        return 0;
    }
  };

  render() {
    const {page} = this.state;
    return (
      <div>
        <Stepper activeStep={this.stepIndex(page)}>
          <Step>
            <StepLabel>Fill in transaction details</StepLabel>
          </Step>
          <Step>
            <StepLabel>Confirm transaction</StepLabel>
          </Step>
          <Step>
            <StepLabel>Publish transaction</StepLabel>
          </Step>
        </Stepper>
        { this.renderCurrentStep(page) }
      </div>
    )
  }

  renderCurrentStep = (page) => {
    const {tx, address, signedTx} = this.state;
    const balances = this.props.balances.get(address).items;

    if (page === SEND_FORM)
      return (<SendForm initialValues={ {asset: KnownAssets.Waves.assetId} }
                        address={ address }
                        balances={ balances }
                        onCancel={ this.cancelSend }
                        onSubmit={ this.confirmTx }/>);

    if (page === CONFIRM_FORM)
      return (<ConfirmForm transaction={ tx }
                           signedTx={ signedTx }
                           previousPage={ this.returnToSendForm }
                           onSubmit={ this.publishTx }/>);

    if (page === PUBLISH_FORM)
      return (<PublishForm />);
  }
}

const mapStateToProps = (state) => {
  return {
    wallet: state.wallet,
    balances: state.balances,
  }
};

export default reduxForm({
  form: 'sendWizard',             // same form name
})(connect(mapStateToProps, null)(SendWizard))

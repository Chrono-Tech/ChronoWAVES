import React from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';

import {browserHistory} from 'react-router';
import {Step, Stepper, StepLabel} from 'material-ui/Stepper';

import Waves from 'waves.js/dist/waves';

import SendForm from './sendForm';
import ConfirmForm from './confirmForm';
import PublishForm from './publishForm';


const SEND_FORM = 'SEND_FORM';
const CONFIRM_FORM = 'CONFIRM_FORM';
const PUBLISH_FORM = 'PUBLISH_FORM';

class SendWizard extends React.Component {

  constructor(props) {
    super(props);
    const { address } = this.props.params;

    // TODO: search sender account

    this.state = {
      page: SEND_FORM,
      address: address
    };
  }

  confirmTx = (values) => {
    const amount = values['amount'];
    const recipient = values['recipient'];
    const fee = values['fee'];
    const asset = values['asset'];

    const pubKey = this.props.wallet.accounts.find(a => a.address === this.state.address).publicKey;
    // TODO: sign tx

    this.setState({
      page: CONFIRM_FORM,
      tx: {
        asset: asset,
        amount: amount,
        sender: this.state.address,
        senderPublicKey: Waves.Base58.encode(pubKey),
        recipient: recipient,
        fee: fee,
      }
    });
  };

  publishTx = () => {
    this.setState({page: PUBLISH_FORM})
  };

  returnToSendForm = () => {
    this.setState({page: SEND_FORM})
  };

  cancelSend = () => {
    browserHistory.push(`/wallet/account/${this.props.params.address}`);
  };

  stepIndex = (page) => {
    switch (page) {
      case SEND_FORM: return 0;
      case CONFIRM_FORM: return 1;
      case PUBLISH_FORM: return 2;
      default: return 0;
    }
  };

  render() {
    const { page } = this.state;

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
    const {tx, address} = this.state;
    const balances = this.props.balances.get(address).items;

    if (page === SEND_FORM)
      return (<SendForm address={ address } balances={ balances } onCancel={ this.cancelSend } onSubmit={ this.confirmTx }/>);

    if (page === CONFIRM_FORM)
      return (<ConfirmForm transaction={ tx } previousPage={ this.returnToSendForm } onSubmit={ this.publishTx }/>);

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

//export default connect(mapStateToProps, null)(SendWizard);

export default reduxForm({
  form: 'sendWizard',             // same form name
})(connect(mapStateToProps, null)(SendWizard))

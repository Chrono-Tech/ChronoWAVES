import React from 'react';
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';
import {Card, CardText} from 'material-ui/Card';
import {browserHistory} from 'react-router';

import SendForm from './sendForm';
import ConfirmForm from './confirmForm';
import PublishForm from './publishForm';


const SEND_FORM = 'SEND_FORM';
const CONFIRM_FORM = 'CONFIRM_FORM';
const PUBLISH_FORM = 'PUBLISH_FORM';

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
    const amount = values['amount'];
    const recipient = values['recipient'];
    const fee = values['fee'];
    const asset = values['asset'];

    // TODO: sign tx

    this.setState({
      page: CONFIRM_FORM,
      tx: {
        asset: asset,
        amount: amount,
        sender: this.state.address,
        senderPublicKey: '',
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

  render() {
    const {page, tx, address} = this.state;
    const balances = this.props.balances[address].items;

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

export default connect(mapStateToProps, null)(SendWizard);

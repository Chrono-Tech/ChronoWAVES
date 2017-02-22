import React from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';

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

    // TODO: sign tx

    this.setState({
      page: CONFIRM_FORM,
      tx: {
        amount: amount,
        sender: this.state.address,
        senderPublicKey: '',
        recipient: recipient,
        fee: 0,
      }
    });
  };

  publishTx = () => {
    this.setState({ page: PUBLISH_FORM })
  };

  render() {
    const { page, tx, address } = this.state;

    return (<Paper>
        { page === SEND_FORM && <SendForm address={ address } onSubmit={ this.confirmTx }/> }
        { page === CONFIRM_FORM && <ConfirmForm transaction={ tx } onSubmit={ this.publishTx }/> }
        { page === PUBLISH_FORM && <PublishForm /> }
      </Paper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    wallet: state.wallet
  }
};

export default connect(mapStateToProps, null)(SendWizard);

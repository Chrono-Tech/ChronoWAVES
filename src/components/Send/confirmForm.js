import React, {PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {SendIcon, BackIcon} from '../Icons';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardText, CardActions} from 'material-ui/Card';

import {assetValueToString} from '../../domain/utility';

class ConfirmForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {handleSubmit, transaction, signedTx, previousPage} = this.props;
    const feeAmount = assetValueToString(transaction.fee, transaction.feeAssetDecimals);

    return (<form onSubmit={ handleSubmit }>
      <Card>
        <CardText>
          <div>ID: {transaction.id}</div>
          <div>Sender: {transaction.sender}</div>
          <div>Recipient: {transaction.recipient}</div>
          <div>Amount: {transaction.amount}</div>
          <div>Asset: {transaction.assetId}</div>
          <div>Fee: {feeAmount} {transaction.feeAssetName}</div>
          <div>Timestamp: {transaction.timestamp}</div>
          <div>Signature: {transaction.signature}</div>
          <div><pre>
            {JSON.stringify(signedTx)}
          </pre>
          </div>
        </CardText>
        <CardActions>
          <FlatButton
            label="BACK"
            icon={<BackIcon />}
            onClick={ previousPage }/>

          <FlatButton
            type="submit"
            label="CONFIRM"
            icon={<SendIcon />}/>
        </CardActions>
      </Card>
    </form>);
  }
}

ConfirmForm.propTypes = {
  transaction: PropTypes.object
};

export default reduxForm({
  form: 'sendWizard',             // same form name
  destroyOnUnmount: false,        // preserve form data
  forceUnregisterOnUnmount: true, // unregister fields on unmount
})(ConfirmForm)


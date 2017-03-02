import React from 'react'
import {Field, reduxForm} from 'redux-form';
import FlatButton from 'material-ui/FlatButton';
import MenuItem  from 'material-ui/MenuItem';
import IdentityIcon from '../IdentityIcon';
import {SendIcon} from '../Icons';

import {
  Checkbox,
  RadioButtonGroup,
  SelectField,
  TextField,
  Toggle,
  DatePicker
} from 'redux-form-material-ui'

class SendForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {handleSubmit, onCancel, address, balances} = this.props;

    return (
      <form onSubmit={ handleSubmit }>
        <div><IdentityIcon address={ address }/>
          { address }
        </div>
        <div>
          <Field name="asset" component={ SelectField } floatingLabelText="Asset" fullWidth={true}>
            {
              balances.map(asset => {
                return (<MenuItem key={asset.assetId} value={asset.assetId} primaryText={asset.assetName}/>);
              })
            }
          </Field>
        </div>
        <div>
          <Field name="amount" component={ TextField } hintText="Amount" label="Amount" fullWidth={true}/>
        </div>
        <div>
          <Field name="recipient" component={ TextField } hintText="Recipient"
                 label="Recipient"
                 floatingLabelText="Recipient"
                 fullWidth={true}/>
        </div>
        <div>
          <TextField disabled={true} defaultValue="0.001" floatingLabelText="Fee"/>
          <TextField disabled={true} defaultValue="WAVES" floatingLabelText="Fee Asset"/>
        </div>

        <div>
          <FlatButton
            label="CANCEL"
            onClick={ onCancel }
          />
          <FlatButton
            type="submit"
            label="SEND"
            icon={<SendIcon />}/>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'sendWizard',             // same form name
  destroyOnUnmount: false,        // preserve form data
  forceUnregisterOnUnmount: true, // unregister fields on unmount
})(SendForm)

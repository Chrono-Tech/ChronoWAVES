import React from 'react'
import { Field, reduxForm } from 'redux-form';
import FlatButton from 'material-ui/FlatButton';
import IdentityIcon from '../IdentityIcon';
import { SendIcon } from '../Icons';

import {
  Checkbox,
  RadioButtonGroup,
  SelectField,
  TextField,
  Toggle,
  DatePicker
} from 'redux-form-material-ui'

const SendForm = (props) => {
  const { handleSubmit, address } = props;

  return (
    <form onSubmit={ handleSubmit }>
      <div><IdentityIcon address={ address }/>
      { address }
      </div>
      <div>
        <Field name="amount" component={ TextField } hintText="Amount" label="Amount"/>

      </div>
      <div>
        <Field name="recipient" component={ TextField } hintText="Recipient"
               label="Recipient"
               floatingLabelText="Recipient"/>
      </div>
      <div>
        <TextField disabled={true} defaultValue="0.001" floatingLabelText="Fee"/>

      </div>

      <div>
        <FlatButton
          type="submit"
          label="SEND"
          icon={<SendIcon />}/>
      </div>
    </form>
  )
};

export default reduxForm({
  form: 'sendWizard',             // <------ same form name
  destroyOnUnmount: false,        // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(SendForm)

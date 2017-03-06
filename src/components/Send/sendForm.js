import React from 'react'
import {Field, reduxForm} from 'redux-form';
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
import {Grid, Row, Col} from 'react-flexbox-grid-aphrodite';

import FlatButton from 'material-ui/FlatButton';
import IdentityIcon from '../IdentityIcon';
import {SendIcon} from '../Icons';
import AssetSelectField from './assetSelectField';

import {
  TextField,
} from 'redux-form-material-ui'

class SendForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {handleSubmit, onCancel, address, balances} = this.props;

    return (
      <form onSubmit={ handleSubmit }>
        <Card>
          <CardHeader title="Transfer Asset"/>
          <CardText>
            <Grid style={{marginLeft:0}}>
              <Row>
                <Col lg={12} md={12} xs={12}>
                  <IdentityIcon address={ address }/>
                  { address }
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={6} lg={6}>
                  <Row>
                    <Col xs={12} md={12} lg={12}>
                      <AssetSelectField name="asset" floatingLabelText="Asset" balances={ balances }/>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={12} lg={12}>
                      <Field name="amount" component={ TextField } hintText="Amount" label="Amount"
                             floatingLabelText="Amount" fullWidth={true}/>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={12} lg={12}>
                      <Field name="recipient" component={ TextField } hintText="Recipient"
                             label="Recipient"
                             floatingLabelText="Recipient"
                             fullWidth={true}/>
                    </Col>
                  </Row>
                </Col>
                <Col xs={12} md={6} lg={6}>
                  <Row>
                    <Col xs={12}>
                      <TextField disabled={true} defaultValue="0.001" floatingLabelText="Fee" fullWidth={true}/>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <TextField disabled={true} defaultValue="WAVES" floatingLabelText="Fee Asset" fullWidth={true}/>
                    </Col>
                  </Row>
                </Col>
              </Row>

            </Grid>

          </CardText>
          <CardActions>
            <FlatButton
              label="CANCEL"
              onClick={ onCancel }
            />
            <FlatButton
              type="submit"
              label="SEND"
              icon={<SendIcon />}/>
          </CardActions>
        </Card>

      </form>
    )
  }
}

export default reduxForm({
  form: 'sendWizard',             // same form name
  destroyOnUnmount: false,        // preserve form data
  forceUnregisterOnUnmount: true, // unregister fields on unmount
})(SendForm)

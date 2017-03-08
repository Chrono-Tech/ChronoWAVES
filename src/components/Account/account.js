import React from 'react';
import {connect} from 'react-redux';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {browserHistory} from 'react-router';
import {Grid, Row, Col} from 'react-flexbox-grid-aphrodite';
import Container from '../container';
import Balances from '../Balances';
import TransactionsHistory from './Transactions/transactions';
import IdentityIcon from '../IdentityIcon';
import Toolbar from '../Toolbar';
import CopyToClipboard from '../CopyToClipboard';
import {SendIcon} from '../Icons';
import Paper from 'material-ui/Paper';
import QRCode from 'qrcode.react'

const styles = {
  address: {
    paddingLeft: '10px'
  }
};

class Account extends React.Component {

  constructor(props) {
    super(props);
  }

  transferHandler = () => {
    browserHistory.push(`/wallet/account/${this.props.params.address}/send`);
  };

  render() {
    const {address} = this.props.params;
    const balances = this.props.balances.get(address);

    const identityIcon = (<IdentityIcon address={ address }/>);

    return (
      <div>
        <Toolbar
          title=""
          actionButtons={
            <FlatButton
              onClick={ this.transferHandler }
              label="TRANSFER"
              icon={<SendIcon />}/>}
        />

        <Container>
          <Paper>
            <Grid style={{marginLeft:0, width:'auto'}}>
              <Row middle="lg,xs,md,sm" start="xs,sm,md,lg">
                <Col xs={12} sm={12} md={8} lg={7}>
                  <Card style={{boxShadow: 'none'}}>
                    <CardHeader
                      avatar={ identityIcon }
                      title={(
                <div style={ styles.address }>
                  {address}<CopyToClipboard />
                </div>)}/>
                    <CardText>
                      <Balances balances={ balances }/>
                    </CardText>
                  </Card>
                </Col>

                <Col md={4} lg={5} xsOffset={1} smOffset={1} mdOffset={0} lgOffset={0}>
                  <div style={{float:'right',marginRight:'15px'}}>
                    <QRCode value={address}/>
                  </div>
                </Col>
              </Row>
            </Grid>
          </Paper>
        </Container>

        <TransactionsHistory address={ address }/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    balances: state.balances
  }
};

export default connect(mapStateToProps, null)(Account);




































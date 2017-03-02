import React from 'react';
import {connect} from 'react-redux';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import {browserHistory} from 'react-router';

import Container from '../container';
import Balances from '../Balances';
import TransactionsHistory from './Transactions/transactions';
import IdentityIcon from '../IdentityIcon';
import Toolbar from '../Toolbar';
import CopyToClipboard from '../CopyToClipboard';

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
    const { address } = this.props.params;
    const balances = this.props.balances[address] || [];

    const identityIcon = (<IdentityIcon address={ address }/>);

    return (
      <div>
        <Toolbar
          title=""
          actionButtons={
            <FlatButton
              onClick={ this.transferHandler }
              label="TRANSFER"
              icon={<FontIcon className="material-icons">send</FontIcon>}/>}
        />

        <Container>
          <Card>
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




































import React from 'react';
import {connect} from 'react-redux';
import {CopyIcon} from '../Icons';
import {Card, CardHeader, CardText} from 'material-ui/Card';

import Container from '../container';
import Balances from '../Balances';
import TransactionsHistory from './Transactions/transactions';
import IdentityIcon from '../IdentityIcon';

const styles = {
  address: {
    paddingLeft: '10px'
  }
};

class Account extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {address} = this.props.params;
    const balances = this.props.balances[address] || [];

    const identityIcon = (<IdentityIcon address={ address }/>);

    return (
      <div>
        <Container>
          <Card>
            <CardHeader
              avatar={ identityIcon }
              title={(
                <div style={ styles.address }>
                  {address}<CopyIcon />
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




































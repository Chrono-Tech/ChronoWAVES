import React from 'react';
import Container from '../container';
import TransactionsHistory from './Transactions/transactions';

class Account extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { address } = this.props.params;

    return (
      <div>
        <Container>
          {address}
        </Container>
        <TransactionsHistory address={ address }/>
      </div>
    );
  }
}

export default Account;




































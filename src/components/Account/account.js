import React from 'react';
import TransactionsHistory from './Transactions/transactions';

class Account extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { address } = this.props.params;

    return (
      <div>
        {address}
        <TransactionsHistory address={address}/>
      </div>
    );
  }
}

export default Account;




































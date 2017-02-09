import React from'react';
import {connect} from 'react-redux';

import {fetchTransactions} from '../actions';

class TransactionsHistory extends React.Component {
  componentWillMount() {
    this.props.loadTxs(this.props.address);
  }

  render() {
    return <div>
      {this.props.address}
      {this.props.transactions.map(tx => (
        <li key={tx.id}>{tx.id}</li>
      ))}
    </div>
  }
}

const mapStateToProps = (state) => {
  return {
    address: state.session.address,
    transactions: state.transactions
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadTxs: (address) => {
      dispatch(fetchTransactions(address));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsHistory);

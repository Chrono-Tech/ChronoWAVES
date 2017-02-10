import React from'react';
import {connect} from 'react-redux';
import {fetchTransactions} from '../../actions';
import TransactionItem from './transaction-item';

class TransactionsHistory extends React.Component {
  componentWillMount() {
    this.props.loadTxs(this.props.address);
  }

  render() {
    return <div>
      {
        this.props.transactions.map(tx =>
          (<TransactionItem key={tx.id} tx={tx} address={this.props.address}/>)
        )
      }
    </div>
  }
}

const mapStateToProps = (state) => {
  return {
    address: state.session.address,
    transactions: state.transactions
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTxs: (address) => {
      dispatch(fetchTransactions(address));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsHistory);

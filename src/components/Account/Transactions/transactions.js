import React, {PropTypes} from'react';
import {connect} from 'react-redux';
import {fetchTransactions} from '../../../redux/actions';
import TransactionItem from './transaction-item';

class TransactionsHistory extends React.Component {

  constructor(props) {
    super(props);
  }

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

TransactionsHistory.propTypes = {
  address: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
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

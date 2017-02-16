import React, {PropTypes} from'react';
import {connect} from 'react-redux';
import {fetchTransactions} from '../../../redux/actions';
import TransactionItem from './transaction-item';
import Container from '../../container';
import {Card, CardTitle, CardText} from 'material-ui/Card';

class TransactionsHistory extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.loadTxs(this.props.address);
  }

  render() {
    const {address} = this.props;
    const transactions = this.props.transactions[address] || [];

    if (transactions.length > 0) {
      return (<Container>
        {
          transactions.map(tx =>
            (<TransactionItem key={ tx.id } tx={ tx } address={ address }/>)
          )
        }

      </Container>)
    }

    return (<Container>There is no transactions yet.</Container>)
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

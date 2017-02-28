import React, {PropTypes} from'react';
import {connect} from 'react-redux';
import moment from 'moment';

import {fetchTransactions} from '../../../redux/transactionsActions';
import TransactionItem from './transactionItem';
import Container from '../../container';
import Loading from '../../Loading';

class TransactionsHistory extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.loadTransactions(this.props.address);
  }

  render() {
    const {address, assetsRegistry} = this.props;
    const transactions = this.props.transactions[address] || { isFetching: true, items: [], itemsByDate: [] };

    if (transactions.isFetching) {
      return (<Loading />);
    }

    if (transactions.items.length === 0) {
      return (<Container>No transactions were found for this account</Container>);
    }

    return (<Container>
      {
        Array.from(transactions.itemsByDate.keys()).map(date => {
          return (<TxGroup
            key={ date }
            date= { date }
            transactions = { transactions.itemsByDate.get(date) }
            address = { address }
            assetsRegistry = { assetsRegistry }
          />);
        })
      }
    </Container>);
    }
}

const TxGroup = ({date, transactions, address, assetsRegistry}) => (
  <div>
    <h4 style={{ opacity: '0.5' }}>{ moment(date).format('YYYY-MM-DD') }</h4>
    {
      transactions.map(tx => {
        const assetId = (tx.assetId === null) ? 'WAVES' : tx.assetId;
        const assetInfo = assetsRegistry[assetId];
        return (<TransactionItem key={ tx.id } tx={ tx } address={ address } assetInfo={ assetInfo }/>)
      })
    }
  </div>
);


TransactionsHistory.propTypes = {
  address: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    transactions: state.transactions,
    assetsRegistry: state.assets
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTransactions: (address) => {
      dispatch(fetchTransactions(address));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsHistory);

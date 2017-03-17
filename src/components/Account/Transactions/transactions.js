import React, {PropTypes} from'react';
import {connect} from 'react-redux';
import moment from 'moment';

import {fetchTransactions} from '../../../redux/transactionsActions';
import TransactionItem from './transactionItem';
import Container from '../../container';
import Loading from '../../Loading';

import {KnownAssets} from '../../../domain/assets';

class TransactionsHistory extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.loadTransactions(this.props.address);
  }

  groupByDate(transactions) {
    const byDate = new Map();
    transactions.forEach(tx => {
      const txDate = new Date(tx.timestamp);
      const date = new Date(txDate.getFullYear(), txDate.getMonth(), txDate.getDate()).getTime();
      if (!byDate.has(date))
        byDate.set(date, []);
      byDate.get(date).push(Object.assign({}, tx));
    });
    return byDate;
  }

  render() {
    const {address, assetsRegistry} = this.props;
    const transactions = this.props.transactions[address] || { isFetching: true, items: [] };

    if (transactions.isFetching) {
      return (<Loading />);
    }

    if (transactions.items.size === 0) {
      return (<Container>No transactions were found for this account</Container>);
    }

    const sorted = transactions.items.sort((a, b) => b.timestamp - a.timestamp);
    const groupedTxs = this.groupByDate(sorted);

    return (<Container>
      {
        Array.from(groupedTxs.keys()).map(date => {
          return (<TxGroup
            key={ date }
            date={ date }
            transactions={ groupedTxs.get(date) }
            address={ address }
            assetsRegistry={ assetsRegistry }
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
        const feeAssetId = (tx.feeAssetId === null) ? 'WAVES' : tx.feeAssetId;
        const assetInfo = assetsRegistry[assetId] ? assetsRegistry[assetId] : KnownAssets.Unknown;
        const feeAssetInfo = assetsRegistry[feeAssetId];

        return (<TransactionItem key={ tx.id }
                                 tx={ tx }
                                 address={ address }
                                 assetInfo={ assetInfo }
                                 feeAssetInfo={ feeAssetInfo }/>)
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

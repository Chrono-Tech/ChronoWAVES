import React, {PropTypes} from'react';
import {connect} from 'react-redux';
import {fetchTransactions} from '../../../redux/actions';
import TransactionItem from './transaction-item';
import Container from '../../container';
import Loading from '../../Loading';

class TransactionsHistory extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.loadTxs(this.props.address);
  }

  render() {
    const {address, assetsRegistry} = this.props;
    const transactions = this.props.transactions[address] || { isFetching: true, items: [] };

    if (transactions.isFetching) {
      return (<Loading />);
    }

    if (transactions.items.length > 0) {
      return (
        <Container>
          {
            transactions.items.map(tx => {
              const assetId = (tx.assetId === null) ? 'WAVES' : tx.assetId;
              const assetInfo = assetsRegistry[assetId];
              return (<TransactionItem key={ tx.id } tx={ tx } address={ address } assetInfo={ assetInfo }/>)
            })
          }
        </Container>)
    }

    return (<Container>No transactions were found for this account</Container>)
  }
}

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
    loadTxs: (address) => {
      dispatch(fetchTransactions(address));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsHistory);

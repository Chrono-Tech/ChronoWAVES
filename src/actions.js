import Waves from 'waves.js/dist/waves';

const client = new Waves(Waves.MainNetParameters()).client("https://nodes.wavesnodes.com");

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const RECEIVE_TRANSACTIONS = 'RECEIVE_TRANSACTIONS';
function receiveTransactionAction(address, transactions) {
  return {
    type: RECEIVE_TRANSACTIONS,
    transactions: transactions,
    address: address
  };
}

export function fetchTransactions(address) {
  return function (dispatch) {
    client.getAddressTransactions(address)
      .then(txs => {
        dispatch(receiveTransactionAction(address, txs));
      });
  }
}

export const RECEIVE_BALANCES = 'RECEIVE_BALANCES';
function receiveBalancesAction(address, balances) {
  return {
    type: RECEIVE_BALANCES,
    address: address,
    balances: balances
  }
}

export function fetchBalances(address) {
  return (dispatch) => {
    Promise.all([
      client.getBalance(address),
      client.getAssetsBalance(address)
    ]).then((results) => {
      const wavesBalance = results[0];
      const assetBalances = results[1];

      //TODO: we need more info about assets
      const balances = [
        {
          name: "WAVES",
          value: wavesBalance
        },
        ...assetBalances.map(b => {
          return {
            name: b.issueTransaction.assetName,
            value: b.balance
          }
        })
      ];

      dispatch(receiveBalancesAction(address, balances))
    });
  }
}

import Waves from 'waves.js/dist/waves';

const client = new Waves(Waves.MainNetParameters()).client("https://nodes.wavesnodes.com");

export const RECEIVE_TRANSACTIONS = 'RECEIVE_TRANSACTIONS';

function receiveTransaction(transactions) {
  return {
    type: RECEIVE_TRANSACTIONS,
    transactions: transactions
  };
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export function fetchTransactions(address) {

  return function (dispatch) {

    client.getAddressTransactions(address)
      .then(txs => {
        dispatch(receiveTransaction(txs));
      });
  }
}

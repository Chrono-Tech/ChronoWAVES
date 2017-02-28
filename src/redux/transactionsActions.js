import {client} from './api';

export const REQUEST_TRANSACTIONS = 'REQUEST_TRANSACTIONS';
function requestTransactions(address) {
  return {
    type: REQUEST_TRANSACTIONS,
    address: address
  }
}

export const RECEIVE_TRANSACTIONS = 'RECEIVE_TRANSACTIONS';
function receiveTransactions(address, transactions) {
  return {
    type: RECEIVE_TRANSACTIONS,
    transactions: transactions,
    address: address
  };
}

export function fetchTransactions(address) {
  return function (dispatch, getState) {

    dispatch(requestTransactions(address));

    return client.getAddressTransactions(address)
      .then(txs => {
        // sort transaction - the younger the higher
        txs = txs.sort((a, b) => b.timestamp - a.timestamp);

        dispatch(receiveTransactions(address, txs));
      });
  }
}

import {client} from './api';
import {receiveTransactions} from './transactionsActions';

export function fetchUtxPool() {
  return function (dispatch, getState) {

    //dispatch(requestTransactions(address));

    return client.getUnconfirmedTransactions()
      .then(txs => {
        // find txs related to accounts in wallet
        const ourTxs = filterUnconfirmedTxs(getState().wallet.accounts, txs);

        console.log(ourTxs);

        ourTxs.forEach(item => dispatch(receiveTransactions(item.address, item.txs)));

        setTimeout(() => dispatch(fetchUtxPool()), 10000);
      });
  }
}

/**
 * Returns only transactions which involved in {accounts}
 *
 * @param accounts
 * @param transactions
 */
export function filterUnconfirmedTxs(accounts, transactions) {
  return accounts.map(acc => {
    return {
      address: acc.address,
      txs: transactions
        .filter(t => t.sender === acc.address || t.recipient === acc.address)
        .map(t => Object.assign({}, t, {unconfirmed: true}))
    }
  }).filter(item => item.txs.length > 0);
}

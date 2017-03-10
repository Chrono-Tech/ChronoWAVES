import {client} from './api';
import {receiveTransactions} from './transactionsActions';

export function fetchUtxPool() {
  return function (dispatch, getState) {

    //dispatch(requestTransactions(address));

    return client.getUnconfirmedTransactions()
      .then(txs => {

        // find txs related to accounts in wallet
        const ourTxs = getState().wallet.accounts.map(acc => {
          return {
            address: acc.address,
            txs: txs
              .filter(t => t.sender === acc.address || t.recipient === acc.address)
              .map(t => Object.assign({}, t, {unconfirmed: true}))
          }
        }).filter(item => item.txs.length > 0);

        console.log(ourTxs);

        ourTxs.forEach(item => dispatch(receiveTransactions(item.address, item.txs)));

        setTimeout(() => dispatch(fetchUtxPool()), 10000);
      });
  }
}

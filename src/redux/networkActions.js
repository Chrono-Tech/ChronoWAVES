import log from 'loglevel';
import {client} from './api';
import {receiveTransactions} from './transactionsActions';
import {fetchBalances} from './actions';

export function fetchUtxPool() {
  return function (dispatch, getState) {
    //dispatch(requestTransactions(address));

    return client.getUnconfirmedTransactions()
      .then(txs => {
        // find txs related to accounts in wallet
        const ourTxs = filterTransactions(getState().wallet.accounts, txs);

        ourTxs.forEach(item => {
          // mark txs as unconfirmed
          const txs = item.txs.map(t => Object.assign({}, t, {unconfirmed: true}))
          dispatch(receiveTransactions(item.address, txs))
        });

        setTimeout(() => dispatch(fetchUtxPool()), 10000);
      });
  }
}

export function fetchHeight() {
  return function (dispatch, getState) {
    const prevHeight = getState().network.currentHeight;
    return client.getHeight()
      .then(height => {
        log.debug('Received Height: ', height);
        dispatch(receiveHeight(height));
      })
      .then(() => {
        const newHeight = getState().network.currentHeight;
        // process blocks from prevHeight to currentHeight
        if (prevHeight && prevHeight < newHeight) {
          dispatch(processBlocks(prevHeight + 1, newHeight));
        }
      })
      .then(() => {
        setTimeout(() => dispatch(fetchHeight()), 30000);
      })
      .catch(error => {
        log.error(error);
        setTimeout(() => dispatch(fetchHeight()), 30000);
      });
  }
}

/**
 * Retrieve blocks and check whether they contain our transactions
 *
 * @param from
 * @param to
 * @returns {Function}
 */
function processBlocks(from, to) {
  return function (dispatch, getState) {
    return client.getBlocks(from, to)
      .then((blocks) => {
        log.debug('Processing blocks: ', blocks.map(b => b.height).join(','));

        blocks.forEach(block => {
          const ourTxs = filterTransactions(getState().wallet.accounts, block.transactions);
          ourTxs.forEach(item => {
            // mark txs as confirmed
            const txs = item.txs.map(t => Object.assign({}, t, {unconfirmed: false, confirmations: 0}));
            dispatch(receiveTransactions(item.address, txs));
            dispatch(fetchBalances(item.address));
          });
        });
      });
  }
}

export const NETWORK_RECEIVE_HEIGHT = 'NETWORK_RECEIVE_HEIGHT';
function receiveHeight(height: number) {
  return {
    type: NETWORK_RECEIVE_HEIGHT,
    height: height
  }
}

/**
 * Returns only transactions which involved in {accounts}
 *
 * @param accounts
 * @param transactions
 */
export function filterTransactions(accounts, transactions) {
  return accounts.map(acc => {
    return {
      address: acc.address,
      txs: transactions
        .filter(t => t.sender === acc.address || t.recipient === acc.address)
    }
  }).filter(item => item.txs.length > 0);
}

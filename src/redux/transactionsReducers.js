import * as ActionTypes from './transactionsActions';
import Immutable from 'immutable';

const onReceiveTransactions = (state, action) => {
  switch (action.type) {
    case ActionTypes.RECEIVE_TRANSACTIONS:
      // add new txs and keep old
      let trans = state[action.address] ? state[action.address].items : new Immutable.Map();
      action.transactions.forEach((tx) => {
        trans = trans.set(tx.id, tx)
      });

      return {
        ...state,
        [action.address]: {
          isFetching: false,
          items: trans,
        }
      };
    default:
      return state;
  }
};

const onRequestTransactions = (state, action) => {
  switch (action.type) {
    case ActionTypes.REQUEST_TRANSACTIONS:
      const currentTrans = state[action.address] ? state[action.address].items : new Immutable.Map();
      return {
        ...state,
        [action.address]: {
          isFetching: true,
          items: currentTrans,
        }
      };
    default:
      return state;
  }
};

export const transactionsReducers = function(state, action) {
  state = state || {};
  state = onRequestTransactions(state, action);
  state = onReceiveTransactions(state, action);
  return state;
};

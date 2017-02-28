import * as ActionTypes from './transactionsActions';

const onReceiveTransactions = (state, action) => {
  switch (action.type) {
    case ActionTypes.RECEIVE_TRANSACTIONS:

      // group txs by date
      const byDate = new Map();
      action.transactions.forEach(tx => {
        const txDate = new Date(tx.timestamp);
        const date = new Date(txDate.getFullYear(), txDate.getMonth(), txDate.getDate()).getTime();
        if (!byDate.has(date))
          byDate.set(date, []);
        byDate.get(date).push(Object.assign({}, tx));
      });

      console.log(byDate);

      return {
        ...state,
        [action.address]: {
          isFetching: false,
          items: action.transactions,
          itemsByDate: byDate
        }
      };
    default:
      return state;
  }
};

const onRequestTransactions = (state, action) => {
  switch (action.type) {
    case ActionTypes.REQUEST_TRANSACTIONS:
      return {
        ...state,
        [action.address]: {
          isFetching: true,
          items: [],
          itemsByDate: []
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

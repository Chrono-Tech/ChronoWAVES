import * as ActionTypes from './transactionsActions';

const onReceiveTransactions = (state, action) => {
  switch (action.type) {
    case ActionTypes.RECEIVE_TRANSACTIONS:
      return {
        ...state,
        [action.address]: {
          isFetching: false,
          items: action.transactions
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
          items: []
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

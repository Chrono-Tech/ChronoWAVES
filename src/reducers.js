import * as ActionTypes from './actions';

export const session = (state = {loggedIn: false}, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        loggedIn: true,
        address: action.address
      });
    default:
      return state;
  }
};


export const transactions = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.RECEIVE_TRANSACTIONS:
      return action.transactions;
    default:
      return state;
  }
};

export const balances = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.RECEIVE_BALANCES:
      return action.balances;
    default:
      return state;
  }
};

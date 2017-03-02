import * as ActionTypes from './actions';


export const session = (state = {loggedIn: false}, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        loggedIn: true,
        seed: action.seed
      });
    default:
      return state;
  }
};

export const walletReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS:
      return {
        seed: action.seed,
        accounts: [],
        nonce: -1
      };
    case ActionTypes.CREATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        accounts: state.accounts.concat(action.account),
        nonce: action.account.nonce
      };
    default:
      return state;
  }
};

export const balances = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.REQUEST_BALANCES:

      return {
        ...state,
        [action.address]: {
          isFetching: true,
          items: []
        }
      };

    case ActionTypes.RECEIVE_BALANCES:
      return {
        ...state,
        [action.address]: {
          isFetching: false,
          items: action.balances
        }
      };
    default:
      return state;
  }
};


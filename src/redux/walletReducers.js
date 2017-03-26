import * as ActionTypes from './walletActions';


const onInit = (state, action) => {
  switch (action.type) {
    case ActionTypes.WALLET_INIT_SEED:
      return {
        seed: action.seed,
        accounts: [],
        nonce: -1
      };
    default:
      return state;
  }
};


const onAccountCreated = (state, action) => {
  switch (action.type) {
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

export const walletReducers = (state, action) => {
  state = state || {};
  state = onInit(state, action);
  state = onAccountCreated(state, action);
  return state;
};

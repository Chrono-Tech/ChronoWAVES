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

export const transactionsReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.RECEIVE_TRANSACTIONS:
      return {
        ...state,
        [action.address]: action.transactions
      };
    default:
      return state;
  }
};

export const balances = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.RECEIVE_BALANCES:
      return {
        ...state,
        [action.address]: action.balances
      };
    default:
      return state;
  }
};


const initialAssetsRegistry = {
  'WAVES': {
    assetName: 'WAVES',
    assetId: 'WAVES',
    decimals: 8,
    quantity: 100000000 * Math.pow(10, 8)
  }
};

export const assetsReducer = (state = initialAssetsRegistry, action) => {
  switch (action.type) {
    case ActionTypes.RECEIVE_ASSET_INFO:
      return {
        ...state,
        [action.assetInfo.assetId]: action.assetInfo
      };
    default:
      return state;
  }
};

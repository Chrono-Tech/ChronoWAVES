import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';

import * as ActionTypes from './actions';

const session = (state = {loggedIn: false}, action) => {
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

const transactions = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.RECEIVE_TRANSACTIONS:
      return action.transactions;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  session,
  transactions
});

const store = createStore(rootReducer,
  applyMiddleware(thunkMiddleware)
);

export default store;

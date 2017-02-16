import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {session, transactionsReducer, balances, walletReducer} from './reducers';

const rootReducer = combineReducers({
  session,
  transactions: transactionsReducer,
  balances,
  wallet: walletReducer
});

const store = createStore(rootReducer,
  applyMiddleware(thunkMiddleware)
);

export default store;

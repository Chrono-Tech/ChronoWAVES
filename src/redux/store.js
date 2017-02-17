import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {session, transactionsReducer, balances, walletReducer, assetsReducer} from './reducers';

const rootReducer = combineReducers({
  session,
  transactions: transactionsReducer,
  balances,
  wallet: walletReducer,
  assets: assetsReducer
});

const store = createStore(rootReducer,
  applyMiddleware(thunkMiddleware)
);

export default store;

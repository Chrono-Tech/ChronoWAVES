import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import {session, balances, walletReducer, assetsReducer} from './reducers';
import {transactionsReducers} from './transactionsReducers';

const rootReducer = combineReducers({
  session,
  transactions: transactionsReducers,
  balances,
  wallet: walletReducer,
  assets: assetsReducer,
  form: formReducer
});

const store = createStore(rootReducer,
  applyMiddleware(thunkMiddleware)
);

export default store;

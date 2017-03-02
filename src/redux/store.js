import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import {session, balances, walletReducer} from './reducers';
import {transactionsReducers} from './transactionsReducers';
import {assetsReducers} from './assetsReducers';


const rootReducer = combineReducers({
  session,
  transactions: transactionsReducers,
  balances,
  wallet: walletReducer,
  assets: assetsReducers,
  form: formReducer
});

const store = createStore(rootReducer,
  applyMiddleware(thunkMiddleware)
);


export default store;

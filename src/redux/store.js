import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger'
import {reducer as formReducer} from 'redux-form';
import {session, balances, walletReducer} from './reducers';
import {transactionsReducers} from './transactionsReducers';
import {assetsReducers} from './assetsReducers';


const appReducer = combineReducers({
  session,
  transactions: transactionsReducers,
  balances,
  wallet: walletReducer,
  assets: assetsReducers,
  form: formReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_SUCCESS') {
    state = undefined
  }

  return appReducer(state, action)
};

const loggerMiddleware = createLogger();

const store = createStore(rootReducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);


export default store;

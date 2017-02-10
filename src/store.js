import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {session, transactions, balances} from './reducers';

const rootReducer = combineReducers({
  session,
  transactions,
  balances
});

const store = createStore(rootReducer,
  applyMiddleware(thunkMiddleware)
);

export default store;

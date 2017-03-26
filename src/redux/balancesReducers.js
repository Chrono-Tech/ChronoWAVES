import Immutable from 'immutable';
import * as ActionTypes from './balancesActions';

const initialBalances = Immutable.Map();

export const balancesReducers = (state = initialBalances, action) => {
  switch (action.type) {
    case ActionTypes.REQUEST_BALANCES:
      return state.set(action.address, {
        isFetching: true,
        items: []
      });

    case ActionTypes.RECEIVE_BALANCES:
      return state.set(action.address, {
        isFetching: false,
        items: action.balances
      });

    default:
      return state;
  }
};


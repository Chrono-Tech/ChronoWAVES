import * as ActionTypes from './userActions';

export const session = (state = {loggedIn: false}, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS:
      return  {
        loggedIn: true,
        seed: action.seed
      };
    default:
      return state;
  }
};

export const userReducers = (state, action) => {
  state = state || {loggedIn: false};
  state = session(state, action);
  return state;
};

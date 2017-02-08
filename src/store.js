import {createStore} from 'redux';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return Object.assign({}, state, {loggedIn: true});
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;

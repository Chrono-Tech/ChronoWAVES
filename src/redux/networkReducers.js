import {NETWORK_RECEIVE_HEIGHT} from './networkActions';

function onReceiveHeight(state, action) {
  if (action.type === NETWORK_RECEIVE_HEIGHT) {

    return {
      ...state,
      currentHeight: action.height
    };

  } else {
    return state;
  }
}

export function networkReducers(state, action) {
  state = state || {};
  state = onReceiveHeight(state, action);
  return state;
}

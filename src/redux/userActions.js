import log from 'loglevel';
import {initWalletAction, createAccountAction} from './walletActions';
import {start as startStore} from './store';

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export function logoutAction() {
  return (dispatch) => {
    log.debug('logoutAction creator');
    // TODO: !!! Stop all timers

    return dispatch({
      type: LOGOUT_SUCCESS
    });
  }
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export function loginSuccessAction(seed) {
  return (dispatch) => {
    dispatch(initWalletAction());

    // We create 2 first accounts with nonce 0 and 1
    dispatch(createAccountAction());
    dispatch(createAccountAction());

    // start periodic tasks
    startStore();

    return dispatch({
      type: LOGIN_SUCCESS,
      seed: seed
    });
  }
}


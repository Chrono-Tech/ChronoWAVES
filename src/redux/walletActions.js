import {blockchain} from '../blockchain';
import {fetchBalances} from './balancesActions';


export const WALLET_INIT_SEED = 'WALLET_INIT_SEED';
export const initWalletAction = (seed) => {
  return {
    type: WALLET_INIT_SEED,
    seed: seed,
  }
};

export const CREATE_ACCOUNT_SUCCESS = 'CREATE_ACCOUNT_SUCCESS';
export function createAccountAction() {
  return (dispatch, getState) => {
    const wallet = getState().wallet;

    // get nonce for new Account
    const nonce = getState().wallet.nonce + 1;
    const acc = blockchain.createAccount(wallet.seed, nonce);

    // create new account
    const newAcc = {
      address: acc.address,
      publicKey: acc.keys.publicKey,
      privateKey: acc.keys.privateKey,
      nonce: nonce,
    };

    dispatch({type: CREATE_ACCOUNT_SUCCESS, account: newAcc});

    dispatch(fetchBalances(acc.address));
  };
}

import {client} from './api';
import {blockchain} from '../blockchain';
import {issueTxToAsset, receiveAssetInfo} from './assetsActions';
import {AssetValue, KnownAssets} from '../domain/assets';


export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export function logoutAction() {
  return {
    type: LOGOUT_SUCCESS
  }
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export function loginSuccessAction(seed) {
  return {
    type: LOGIN_SUCCESS,
    seed: seed
  }
}

export const CREATE_ACCOUNT = 'CREATE_ACCOUNT';
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


export const REQUEST_BALANCES = 'REQUEST_BALANCES';
function requestBalancesAction(address) {
  return {
    type: REQUEST_BALANCES,
    address: address
  }
}

export const RECEIVE_BALANCES = 'RECEIVE_BALANCES';
function receiveBalancesAction(address, balances) {
  return {
    type: RECEIVE_BALANCES,
    address: address,
    balances: balances
  }
}

export function fetchBalances(address) {
  return (dispatch, getState) => {

    dispatch(requestBalancesAction(address));

    Promise.all([
      client.getBalance(address),
      client.getAssetsBalance(address)
    ]).then((results) => {
      const wavesBalance = results[0];
      const assetBalances = results[1];

      const balances = [
        new AssetValue(
          KnownAssets.Waves.name,
          KnownAssets.Waves.assetId,
          KnownAssets.Waves.decimals,
          wavesBalance
        ),

        ...assetBalances.map(b => {

          // update our assets registry
          const assetInfo = issueTxToAsset(b.issueTransaction);
          dispatch(receiveAssetInfo(assetInfo));

          return new AssetValue(
            assetInfo.name,
            assetInfo.assetId,
            assetInfo.decimals,
            b.balance);
        })
      ];

      dispatch(receiveBalancesAction(address, balances))
    });
  }
}




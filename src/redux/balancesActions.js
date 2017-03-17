import {issueTxToAsset, receiveAssetInfo} from './assetsActions';
import {AssetValue, KnownAssets} from '../domain/assets';
import {client} from './api';

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

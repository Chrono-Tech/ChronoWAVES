import {AssetInfo} from '../domain/assetInfo';
import {client} from './api';

export function fetchAssetInfo(assetId) {
  return (dispatch) => {

    if (assetId !== 'WAVES') {

      // call node api to get asset info
      return client.getTransaction(assetId).then(issueTx => {
        const assetInfo = issueTxToAsset(issueTx);
        dispatch(receiveAssetInfo(assetInfo))
      });
    } else return Promise.resolve();
  }
}

export const RECEIVE_ASSET_INFO = 'RECEIVE_ASSET_INFO';
export function receiveAssetInfo(assetInfo) {

  console.log('receiveAssetInfo()' + JSON.stringify(assetInfo));

  return {
    type: RECEIVE_ASSET_INFO,
    assetInfo: assetInfo

  }
}

export const issueTxToAsset = (issueTx) => {
  return new AssetInfo(
    issueTx.assetId,
    issueTx.assetName,
    issueTx.quantity,
    issueTx.decimals,
    issueTx.sender,
    issueTx.timestamp,
    issueTx.reissuable
  );
};

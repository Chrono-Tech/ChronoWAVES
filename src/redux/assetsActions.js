import {AssetInfo} from '../domain/assets';
import {client} from './api';

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

  return {
    type: RECEIVE_ASSET_INFO,
    assetInfo: assetInfo
  }
}


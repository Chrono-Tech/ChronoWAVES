import {AssetInfo} from '../domain/assetInfo';
import * as ActionTypes from './assetsActions';

const initialAssetsRegistry = {
  'WAVES': new AssetInfo("WAVES", "WAVES", 100000000 * Math.pow(10, 8), 8, "N/A", 1460678400000, false)
};

const onReceiveAssetInfo = (state = initialAssetsRegistry, action) => {
  switch (action.type) {
    case ActionTypes.RECEIVE_ASSET_INFO:
      return {
        ...state,
        [action.assetInfo.assetId]: action.assetInfo
      };
    default:
      return state;
  }
};


export const assetsReducers = function(state, action) {
  state = state || initialAssetsRegistry;
  state = onReceiveAssetInfo(state, action);
  return state;
};

import {KnownAssets} from '../domain/assets';
import * as ActionTypes from './assetsActions';

const initialAssetsRegistry = {
  'WAVES': KnownAssets.Waves
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

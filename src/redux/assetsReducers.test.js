import {assetsReducers} from './assetsReducers';
import {AssetInfo} from '../domain/assetInfo';
import {receiveAssetInfo} from './assetsActions';

const WavesAsset = new AssetInfo("WAVES", "WAVES", 100000000 * Math.pow(10, 8), 8, "N/A", 1460678400000, false);

describe('assets reducers', () => {
  it('should return initial state', () => {
    expect(assetsReducers(undefined, {})).toEqual(
      {
        'WAVES': WavesAsset
      }
    );
  });

  it('should add new asset only once', () => {
    const a = new AssetInfo('AssetId', 'AssetName', 10, 2, 'Issuer', 1, true);
    let state = assetsReducers(undefined, receiveAssetInfo(a));
    expect(state).toEqual(
      {
        'WAVES': WavesAsset,
        'AssetId': a
      }
    );
    // again
    state = assetsReducers(state, receiveAssetInfo(a));
    expect(state).toEqual(
      {
        'WAVES': WavesAsset,
        'AssetId': a
      }
    );
  });
});

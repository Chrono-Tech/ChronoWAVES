import {assetsReducers} from './assetsReducers';
import {AssetInfo, KnownAssets} from '../domain/assets';
import {receiveAssetInfo} from './assetsActions';


describe('assets reducers', () => {
  it('should return initial state', () => {
    expect(assetsReducers(undefined, {})).toEqual(
      {
        'WAVES': KnownAssets.Waves
      }
    );
  });

  it('should add new asset only once', () => {
    const a = new AssetInfo('AssetId', 'AssetName', 10, 2, 'Issuer', 1, true);
    let state = assetsReducers(undefined, receiveAssetInfo(a));
    expect(state).toEqual(
      {
        'WAVES': KnownAssets.Waves,
        'AssetId': a
      }
    );
    // again
    state = assetsReducers(state, receiveAssetInfo(a));
    expect(state).toEqual(
      {
        'WAVES': KnownAssets.Waves,
        'AssetId': a
      }
    );
  });
});

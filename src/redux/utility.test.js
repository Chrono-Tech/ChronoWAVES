import {totals} from './utility';
import Immutable from 'immutable';
import {AssetValue, KnownAssets, AssetInfo} from '../domain/assets';

describe('utility functions', () => {
  it('should calculate totals for asset', ()=>{

    const balances = Immutable.Map()
      .set('address1', {
        items: [
          new AssetValue('A1', 'id1', 4, 76),
          new AssetValue('A2', 'id2', 4, 6),
        ]
      })
      .set('address2', {
        items: [
          new AssetValue('A1', 'id1', 4, 11),
        ]
      });

    const A1Totals = totals(balances, new AssetInfo('id1', 'A1', 1, 4, 'I1', 1, false));
    expect(A1Totals.value).toEqual(87);

    const A2Totals = totals(balances, new AssetInfo('id2', 'A2', 1, 4, 'I2', 1, false));
    expect(A2Totals.value).toEqual(6);
  });
});

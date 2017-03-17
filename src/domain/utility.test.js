import {assetValueToString} from './utility';

describe('utility', () => {
  it('should convert asset units to string', () => {
    expect(assetValueToString(1, 8)).toEqual('0.00000001');
    expect(assetValueToString(1, 2)).toEqual('0.01');
    expect(assetValueToString(1001, 2)).toEqual('10.01');
  });
});

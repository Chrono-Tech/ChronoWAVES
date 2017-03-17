import {AssetValue} from './assets';

describe('AssetValue', () => {
  it('should convert asset units to string', () => {
    expect(new AssetValue('', '', 8, 1).toString()).toEqual('0.00000001');
    expect(new AssetValue('', '', 2, 1).toString()).toEqual('0.01');
    expect(new AssetValue('', '', 2, 1001).toString()).toEqual('10.01');
  });
});

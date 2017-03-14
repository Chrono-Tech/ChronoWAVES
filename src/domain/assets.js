//@flow
import BigNumber from 'bignumber.js';

export class AssetInfo {
  assetId: string;
  name: string;
  quantity: number;
  decimals: number;
  issuer: string;
  timestamp: number;
  reissuable: boolean;

  constructor(assetId: string,
              name: string,
              quantity: number,
              decimals: number,
              issuer: string,
              timestamp: number,
              reissuable: boolean) {
    this.name = name;
    this.assetId = assetId;
    this.quantity = quantity;
    this.decimals = decimals;
    this.issuer = issuer;
    this.timestamp = timestamp;
    this.reissuable = reissuable;
  }
}

export class AssetValue {
  assetName: string;
  assetId: string;
  assetDecimals: number;
  value: number;

  constructor(assetName: string, assetId: string, assetDecimals: number, value: number) {
    this.assetName = assetName;
    this.assetId = assetId;
    this.assetDecimals = assetDecimals;
    this.value = value;
  }

  add(value: number) : AssetValue {
    return new AssetValue(this.assetName, this.assetId, this.assetDecimals, this.value + value);
  }

  toString() {
    return new BigNumber(this.value).div(Math.pow(10, this.assetDecimals)).toFixed(this.assetDecimals);
  }
}

export class KnownAssets {

  static Waves: AssetInfo = new AssetInfo(
    "WAVES",
    "WAVES",
    100000000 * Math.pow(10, 8),
    8,
    "N/A",
    1460678400000,
    false);

  static Unknown: AssetInfo = new AssetInfo(
    '',
    'UNKNOWN',
    0,
    8,
    'UNKNOWN',
    1,
    false
  );
}

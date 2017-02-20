//@flow
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

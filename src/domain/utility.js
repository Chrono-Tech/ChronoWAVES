//@flow
import BigNumber from 'bignumber.js';

export const assetValueToString = (units: number, decimals: number) => {
  return new BigNumber(units).div(Math.pow(10, decimals)).toFixed(decimals);
};

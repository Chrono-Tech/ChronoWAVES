import Immutable from 'immutable';
import {AssetInfo, AssetValue} from '../domain/assets';

/**
 * Calculate total balance of particular asset for all addresses
 *
 * @param balances
 * @param asset
 * @returns {AssetBalance}
 */
export const totals = (balances: Immutable.Map, asset: AssetInfo): AssetValue => {

  const initialBalance = new AssetValue(asset.name, asset.assetId, asset.decimals, 0);

  return balances.reduce((r, _balances, address) => {
    const assetBalance = _balances.items.find(e => e.assetId === asset.assetId);
    const balance = (assetBalance === undefined) ? 0 : assetBalance.value;
    return r.add(balance);
  }, initialBalance);
};

export const isFetching = (balances: Immutable.Map): boolean => {
  const initial = false;
  return balances.reduce((r, _balances, address) => {
    return (r || _balances.isFetching);
  }, initial);
};

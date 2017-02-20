import Waves from 'waves.js/dist/waves';
import {AssetInfo} from '../domain/assetInfo';

const blockchainParams = Waves.MainNetParameters();

const client = new Waves(blockchainParams).client("https://nodes.wavesnodes.com");

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export function loginSuccessAction(seed) {
  return {
    type: LOGIN_SUCCESS,
    seed: seed
  }
}

export const CREATE_ACCOUNT = 'CREATE_ACCOUNT';
export const CREATE_ACCOUNT_SUCCESS = 'CREATE_ACCOUNT_SUCCESS';

export function createAccountAction() {
  return (dispatch, getState) => {
    const wallet = getState().wallet;

    // get nonce for new Account
    const nonce = getState().wallet.nonce + 1;
    const acc = Waves.Account.create(blockchainParams, wallet.seed, nonce);

    // create new account
    const newAcc = {
      address: acc.address,
      nonce: nonce,
    };

    dispatch({type: CREATE_ACCOUNT_SUCCESS, account: newAcc});

    dispatch(fetchBalances(acc.address));
  };
}

export const RECEIVE_TRANSACTIONS = 'RECEIVE_TRANSACTIONS';
function receiveTransactionAction(address, transactions) {
  return {
    type: RECEIVE_TRANSACTIONS,
    transactions: transactions,
    address: address
  };
}

export function fetchTransactions(address) {
  return function (dispatch, getState) {
    client.getAddressTransactions(address)
      .then(txs => {
        // sort transaction - the younger the higher
        txs = txs.sort((a, b) => b.timestamp - a.timestamp);
        dispatch(receiveTransactionAction(address, txs));
      });
  }
}

export const RECEIVE_BALANCES = 'RECEIVE_BALANCES';
function receiveBalancesAction(address, balances) {
  return {
    type: RECEIVE_BALANCES,
    address: address,
    balances: balances
  }
}

export function fetchBalances(address) {
  return (dispatch, getState) => {
    Promise.all([
      client.getBalance(address),
      client.getAssetsBalance(address)
    ]).then((results) => {
      const wavesBalance = results[0];
      const assetBalances = results[1];

      //TODO: we need more info about assets
      const balances = [
        {
          assetName: "WAVES",
          assetId: "WAVES",
          value: wavesBalance
        },
        ...assetBalances.map(b => {

          // update our assets registry
          const assetInfo = issueTxToAsset(b.issueTransaction);
          dispatch(receiveAssetInfo(assetInfo));

          return {
            assetName: b.issueTransaction.assetName,
            assetId: b.assetId,
            value: b.balance
          }
        })
      ];

      dispatch(receiveBalancesAction(address, balances))
    });
  }
}

export function fetchAssetInfo(assetId) {
  return (dispatch) => {

    if (assetId !== 'WAVES') {

      // call node api to get asset info
      return client.getTransaction(assetId).then(issueTx => {
        const assetInfo = issueTxToAsset(issueTx);
        dispatch(receiveAssetInfo(assetInfo))
      });
    } else return Promise.resolve();
  }
}

export const RECEIVE_ASSET_INFO = 'RECEIVE_ASSET_INFO';
export function receiveAssetInfo(assetInfo) {
  console.log('receiveAssetInfo()' + JSON.stringify(assetInfo));
  return {
    type: RECEIVE_ASSET_INFO,
    assetInfo: assetInfo

  }
}

const issueTxToAsset = (issueTx) => {
  return new AssetInfo(
    issueTx.assetId,
    issueTx.assetName,
    issueTx.quantity,
    issueTx.decimals,
    issueTx.sender,
    issueTx.timestamp,
    issueTx.reissuable
  );
};

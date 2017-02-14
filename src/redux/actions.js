import Waves from 'waves.js/dist/waves';

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
      balances: [
        {
          token: "WAVES",
          value: 0
        },
        {
          token: "WCT",
          value: 0
        },
        {
          token: "LHAU",
          value: 0
        }
      ]
    };

    dispatch(
      {
        type: CREATE_ACCOUNT_SUCCESS,
        account: newAcc
      }
    )
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
          name: "WAVES",
          value: wavesBalance
        },
        ...assetBalances.map(b => {
          return {
            name: b.issueTransaction.assetName,
            value: b.balance
          }
        })
      ];

      dispatch(receiveBalancesAction(address, balances))
    });
  }
}

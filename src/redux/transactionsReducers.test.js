import {requestTransactions, receiveTransactions} from './transactionsActions';
import {transactionsReducers} from './transactionsReducers';
import Immutable from 'immutable';

describe('transactionsReducers', () => {

  it('onRequestTransactions init state', ()=>{

    const state = transactionsReducers(undefined, requestTransactions('Address1'));
    expect(state['Address1']).toEqual({
      isFetching: true,
      items: new Immutable.Map()
    })
  });

  it('onReceiveTransactions should keep old txs', ()=>{

    let state = {'Address1': {
      isFetching: false,
      items: new Immutable.Map()
        .set('txid1', {id:'txid1'})
    }};
    const newTx = {id:'txid2'};

    state = transactionsReducers(state, receiveTransactions('Address1', [newTx]));

    expect(state['Address1'].items.count()).toEqual(2);
  });

});

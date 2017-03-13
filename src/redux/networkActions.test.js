import {filterTransactions} from './networkActions';

describe('networkActions', () => {

  it('should filter unconfirmed transactions', () => {

    const accounts = [
      {
        address: 'Address1'
      },
      {
        address: 'Address2'
      }
    ];

    const txs = [
      {
        id:'id1',
        sender:'',
        recipient:'Address1'
      },
      {
        id:'id2',
        sender:'Address2',
        recipient:''
      },
      {
        id:'id3',
        sender:'Address8',
        recipient:'Address9'
      }
    ];

    const filtered = filterTransactions(accounts, txs);

    expect(filtered.length).toEqual(2);
    expect(filtered.find(i => i.address === 'Address1').txs.length).toEqual(1);
    expect(filtered.find(i => i.address === 'Address2').txs.length).toEqual(1);
  });
});

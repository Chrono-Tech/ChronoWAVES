import React, {PropTypes} from 'react';
import {Card, CardText, CardTitle} from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table'
import {assetValueToString} from '../../../domain/utility';
import TxDetails from './txDetails';
import Waves from 'waves.js/dist/waves';

const inTxStyle = {
  transform: 'rotate(180deg)',
  verticalAlign: 'middle',
  fontSize: '36px',
  color: '#e6f2e6',
};

const outTxStyle = {
  verticalAlign: 'middle',
  fontSize: '36px',
  color: '#f2e6e6',
};

const getTxTypeName = (type) => {
  switch (type) {
    case 2: return 'Payment';
    case 4: return 'Asset Transfer';
  }
};

const UnconfirmedChip = () => (
  <Chip backgroundColor={'#e2a864'}>UNCONFIRMED</Chip>
);

/**
 * Represents one transaction
 */
const TransactionItem = ({tx, address, assetInfo, feeAssetInfo}) => {
  const correspondent = (tx.sender === address) ? tx.recipient : tx.sender;
  const icon = (tx.sender === address) ?
    (<FontIcon className="material-icons" style={outTxStyle}>input</FontIcon>) :
    (<FontIcon className="material-icons" style={inTxStyle}>input</FontIcon>);

  const amount = assetValueToString(tx.amount, assetInfo.decimals);
  const amountText = (tx.sender === address) ? "-" + amount : amount;

  tx = Object.assign({}, tx, {signatureValidation: Waves.Transactions.validateSignature(tx)});

  return (<Card key={tx.id}>
    <CardTitle actAsExpander={true} showExpandableButton={true} >

      <Table selectable={false}>
        <TableBody displayRowCheckbox={false}>
          <TableRow style={{verticalAlign:'top'}}>
            <TableRowColumn className="mono" style={{width:'50%'}}>
              <div style={{display:'inline-flex', marginRight:'5px'}}>{icon}</div>
              <div style={{display:'inline-block', verticalAlign:'top'}}>
                <div style={{}}>{correspondent}</div>
                <div>{getTxTypeName(tx.type)}</div>
              </div>
            </TableRowColumn>
            <TableRowColumn style={{textAlign: 'right', width:'20%'}}>{amountText}</TableRowColumn>
            <TableRowColumn>{assetInfo.name}</TableRowColumn>
            <TableRowColumn>{tx.unconfirmed && <UnconfirmedChip />}</TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    </CardTitle>

    <CardText expandable={true} >
      <TxDetails tx={ tx } feeAssetInfo={ feeAssetInfo } />
    </CardText>
  </Card>)
};


TransactionItem.propTypes = {
  address: PropTypes.string.isRequired,
  tx: PropTypes.shape({
    recipient: PropTypes.string,
    sender: PropTypes.string,
    id: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    timestamp: PropTypes.number.isRequired
  })
};

export default TransactionItem;

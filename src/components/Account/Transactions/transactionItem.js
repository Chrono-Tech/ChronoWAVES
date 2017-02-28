import React, {PropTypes} from 'react';
import moment from 'moment';
import {Card, CardText, CardTitle} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table'
import {red500, greenA200, lightBlue600} from 'material-ui/styles/colors';
import {assetValueToString, timestampToIsoDate} from '../../../domain/utility';

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

/**
 * Represents one transaction
 */
const TransactionItem = ({tx, address, assetInfo}) => {
  const correspondent = (tx.sender === address) ? tx.recipient : tx.sender;
  const icon = (tx.sender === address) ?
    (<FontIcon className="material-icons" style={outTxStyle}>input</FontIcon>) :
    (<FontIcon className="material-icons" style={inTxStyle}>input</FontIcon>);

  const amount = assetValueToString(tx.amount, assetInfo.decimals);
  const amountText = (tx.sender === address) ? "-" + amount : amount;

  return (<Card key={tx.id}>
    <CardTitle actAsExpander={true}
               showExpandableButton={true}>
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
          </TableRow>
        </TableBody>
      </Table>
    </CardTitle>
    {/*<CardActions>*/}
    {/*<FlatButton label="Action1" />*/}
    {/*<FlatButton label="Action2" />*/}
    {/*</CardActions>*/}
    <CardText expandable={true}>
      <div>{ moment(tx.timestamp).format('YYYY-MM-DD HH:mm:ss') }</div>
      <div>
        <h5>Transaction ID</h5>
        <span className="mono">{tx.id}</span>
      </div>
      <div>
        <h5>Signature</h5>
        <span className="mono">{tx.signature}</span>
      </div>
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

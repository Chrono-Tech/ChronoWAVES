import React, {PropTypes} from 'react';
import {Card, CardText, CardTitle} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table'
import {getAssetName} from '../../../domain/assetsRegistry';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';

const inTxStyle = {
  transform: 'rotate(180deg)',
  verticalAlign: 'middle',
  fontSize: '36px',
  color: greenA200
};

const outTxStyle = {
  verticalAlign: 'middle',
  fontSize: '36px',
  color: red500
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
const TransactionItem = ({tx, address}) => {
  const correspondent = (tx.sender === address) ? tx.recipient : tx.sender;
  const icon = (tx.sender === address) ?
    (<FontIcon className="material-icons" style={outTxStyle}>input</FontIcon>) :
    (<FontIcon className="material-icons" style={inTxStyle}>input</FontIcon>);

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
            <TableRowColumn style={{textAlign: 'right', width:'20%'}}>{tx.amount}</TableRowColumn>
            <TableRowColumn>{getAssetName(tx.assetId)}</TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    </CardTitle>
    {/*<CardActions>*/}
    {/*<FlatButton label="Action1" />*/}
    {/*<FlatButton label="Action2" />*/}
    {/*</CardActions>*/}
    <CardText expandable={true}>
      <div>{tx.timestamp}</div>
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

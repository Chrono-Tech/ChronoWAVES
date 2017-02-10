import React, {PropTypes} from 'react';
import {Card, CardText, CardTitle} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table'

const inTxStyle = {
  transform: 'rotate(180deg)',
  verticalAlign: 'middle'
};

/**
 * Represents one transaction
 */
const TransactionItem = ({tx, address}) => {
  const correspondent = (tx.sender === address) ? tx.recipient : tx.sender;
  const icon = (tx.sender === address) ?
    (<FontIcon className="material-icons">input</FontIcon>) :
    (<FontIcon className="material-icons" style={inTxStyle}>input</FontIcon>);

  return (<Card key={tx.id}>
    <CardTitle actAsExpander={true}
               showExpandableButton={true}
               subtitle={"Type " + tx.type}>
      <Table selectable={false}>
        <TableBody displayRowCheckbox={false}>
          <TableRow>
            <TableRowColumn className="mono">{icon} {correspondent}</TableRowColumn>
            <TableRowColumn style={{textAlign: 'right'}}>{tx.amount}</TableRowColumn>
            <TableRowColumn>WAVES</TableRowColumn>
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

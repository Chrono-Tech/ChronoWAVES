import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid-aphrodite';
import moment from 'moment';
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table'
import {assetValueToString} from '../../../domain/utility';

const TxDetails = ({tx, feeAssetInfo}) => {

  const fee = assetValueToString(tx.fee, feeAssetInfo.decimals);

  return (
    <Grid>
      <Row>
        <Col lg={6}>
          <Table selectable={false}>
            <TableBody displayRowCheckbox={false}>
              <TableRow>
                <TableRowColumn>When</TableRowColumn>
                <TableRowColumn>{ moment(tx.timestamp).format('YYYY-MM-DD HH:mm:ss') }</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>ID</TableRowColumn>
                <TableRowColumn><span className="mono">{tx.id}</span></TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
        </Col>
        <Col lg={6}>
          <Table selectable={false}>
            <TableBody displayRowCheckbox={false}>
              <TableRow>
                <TableRowColumn>Fee</TableRowColumn>
                <TableRowColumn>{ fee }</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Fee Asset</TableRowColumn>
                <TableRowColumn>{ feeAssetInfo.name }</TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          Signature <span className="mono">{tx.signature}</span>
        </Col>
      </Row>
    </Grid>
  );

};

export default TxDetails;

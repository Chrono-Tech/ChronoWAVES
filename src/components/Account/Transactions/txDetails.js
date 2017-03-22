import React from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid-aphrodite';
import moment from 'moment';
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table'
import {green400, amber400} from 'material-ui/styles/colors';

import {assetValueToString} from '../../../domain/utility';
import {VerifiedIcon, WarningIcon} from '../../Icons';
import {ValidationResult} from 'waves.js/dist/waves';
import Waves from 'waves.js/dist/waves';


const signatureValidation = (validationResult) => {
  if (validationResult === ValidationResult.Ok)
    return (<VerifiedIcon style={{color:green400}}/>);
  return (<WarningIcon style={{color:amber400}}/>)
};

const TxDetails = ({tx, feeAssetInfo}) => {
  const fee = assetValueToString(tx.fee, feeAssetInfo.decimals);
  const base58ToUtf8 = (string) => string ? Waves.Utils.bytesToUtf8(Waves.Base58.decode(string)):'';

  return (
    <Grid style={{marginLeft:0, width:'auto'}}>
      <Row start="xs,sm,md,lg">
        <Col lg={7}>
          <Table selectable={false}>
            <TableBody displayRowCheckbox={false}>
              <TableRow>
                <TableRowColumn style={{textAlign: 'left',width:'30%'}}>When</TableRowColumn>
                <TableRowColumn
                  style={{textAlign: 'left'}}>{ moment(tx.timestamp).format('YYYY-MM-DD HH:mm:ss') }</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn style={{textAlign: 'left'}}>ID</TableRowColumn>
                <TableRowColumn style={{textAlign: 'left'}}><span className="mono">{tx.id}</span></TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn style={{textAlign: 'left'}}>Attachment (Base58)</TableRowColumn>
                <TableRowColumn style={{textAlign: 'left'}}><span className="mono">{tx.attachment}</span></TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn style={{textAlign: 'left'}}>Attachment (UTF-8)</TableRowColumn>
                <TableRowColumn style={{textAlign: 'left'}}><span className="mono">{base58ToUtf8(tx.attachment)}</span></TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
        </Col>
        <Col lg={5}>
          <Table selectable={false}>
            <TableBody displayRowCheckbox={false}>
              <TableRow>
                <TableRowColumn style={{textAlign: 'left',width:'30%'}}>Fee</TableRowColumn>
                <TableRowColumn style={{textAlign: 'left'}}>{ fee }</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn style={{textAlign: 'left'}}>Fee Asset</TableRowColumn>
                <TableRowColumn style={{textAlign: 'left'}}>{ feeAssetInfo.name }</TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          {signatureValidation(tx.signatureValidation)} Signature <span style={{opacity:'0.5'}} className="mono">{tx.signature}</span>
        </Col>
      </Row>
    </Grid>
  );

};

export default TxDetails;

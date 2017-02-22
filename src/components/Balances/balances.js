import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Chip from 'material-ui/Chip';
import Dialog from 'material-ui/Dialog';
import {Table, TableBody, TableRowColumn, TableRow} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';

import {assetValueToString} from '../../domain/utility';
import {fetchAssetInfo} from '../../redux/actions';
import {NavigationClose} from '../Icons';
import Loading from '../Loading';

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

class Balances extends React.Component {
  state = {
    open: false,
  };

  constructor(props) {
    super(props);
  }

  handleOpen = (assetId) => {
    const assetInfo = this.props.assetRegistry[assetId];

    if (typeof assetInfo === 'undefined' || assetInfo === null) {
      this.props.dispatch(fetchAssetInfo(assetId));
    }
    this.setState({open: true, selectedAssetId: assetId});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const { balances, assetRegistry } = this.props;

    if (balances.isFetching) {
      return (<Loading size={1}/>);
    }

    return (
      <div style={ styles.wrapper }>
        {
          balances.items.map(b => {
            const decimals = assetRegistry[b.assetId].decimals;
            const value = assetValueToString(b.value, decimals);

            return (<Chip style={ styles.chip } key={ b.assetId } onTouchTap={ () => this.handleOpen(b.assetId) }>
              { value } { b.assetName }
            </Chip>)
          })
        }

        <Dialog
          title={<div>
                    Asset Details
                    <IconButton style={{float: 'right', margin: "-12px -12px 0px"}} onTouchTap={this.handleClose}>
                        <NavigationClose />
                    </IconButton>
                </div>}
          modal={ false }
          open={ this.state.open }
          onRequestClose={ this.handleClose }
        >
          {

            this.renderAssetDetails()
          }
        </Dialog>
      </div>
    );
  }

  renderAssetDetails = () => {
    const assetInfo = this.props.assetRegistry[this.state.selectedAssetId];
    return (
      <div>
        {
          (assetInfo) && (
            <Table selectable={false}>
              <TableBody displayRowCheckbox={false}>
                <TableRow>
                  <TableRowColumn style={{width:'30%'}}>
                    Asset ID
                  </TableRowColumn>
                  <TableRowColumn className="mono">
                    { assetInfo.assetId }
                  </TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>Name</TableRowColumn>
                  <TableRowColumn>{ assetInfo.name }</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>Quantity</TableRowColumn>
                  <TableRowColumn>{ assetInfo.quantity }</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>Decimals</TableRowColumn>
                  <TableRowColumn>{ assetInfo.decimals }</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>Issuer</TableRowColumn>
                  <TableRowColumn>{ assetInfo.issuer }</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>Issued</TableRowColumn>
                  <TableRowColumn>{ assetInfo.timestamp }</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>Reissuable</TableRowColumn>
                  <TableRowColumn>{ assetInfo.reissuable ? "Yes" : "No" }</TableRowColumn>
                </TableRow>
              </TableBody>
            </Table>
          )
        }
      </div>
    );
  };
}


Balances.propTypes = {
  balances: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    assetRegistry: state.assets
  }
};

export default connect(mapStateToProps, null)(Balances);

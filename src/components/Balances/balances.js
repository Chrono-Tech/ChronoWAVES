import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Chip from 'material-ui/Chip';
import Dialog from 'material-ui/Dialog';
import {Table, TableBody, TableRowColumn, TableRow} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import moment from 'moment';

import {fetchAssetInfo} from '../../redux/assetsActions';
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
    const { balances } = this.props;

    if (balances.isFetching) {
      return (<Loading size={1}/>);
    }

    return (
      <div style={ styles.wrapper }>
        {
          balances.items.map(asset => {
            const value = asset.toString();
            return (<Chip style={ styles.chip } key={ asset.assetId } onTouchTap={ () => this.handleOpen(asset.assetId) }>
              { value } { asset.assetName }
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

  //TODO: move it outside of Balances control
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
                  <TableRowColumn>{ moment(assetInfo.timestamp).format('YYYY-MM-DD HH:mm:ss') }</TableRowColumn>
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

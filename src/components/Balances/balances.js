import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Chip from 'material-ui/Chip';
import Dialog from 'material-ui/Dialog';
import {fetchAssetInfo} from '../../redux/actions';

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
    if (assetInfo == null) {
      this.props.dispatch(fetchAssetInfo(assetId));
    }
    this.setState({ open: true, selectedAssetId: assetId });
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const { balances } = this.props;
    return (
      <div style={ styles.wrapper }>
        {
          balances.map(b => (
            <Chip style={ styles.chip } key={ b.assetId } onTouchTap={ () => this.handleOpen(b.assetId) }>
              { b.value } { b.assetName }
            </Chip>
          ))
        }

        <Dialog
          title="Dialog With Actions"
          modal={ false }
          open={ this.state.open }
          onRequestClose={ this.handleClose }
        >
          {
              <div>ASSET: {JSON.stringify(this.props.assetRegistry[this.state.selectedAssetId])}</div>
          }
        </Dialog>
      </div>
    );
  }
}

Balances.propTypes = {
  balances: PropTypes.array
};

const mapStateToProps = (state) => {
  return {
    assetRegistry: state.assets
  }
};

export default connect(mapStateToProps, null)(Balances);

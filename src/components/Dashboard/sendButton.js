import log from 'loglevel';
import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import {SendIcon} from '../Icons';
import {Link} from 'react-router';


const styles = {
  display: 'inline-block'
};

export default class SendButton extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const addresses = this.props.addresses;

    return (
      <div style={ styles }>
        <FlatButton
          onTouchTap={ this.handleTouchTap }
          label="SEND"
          icon={<SendIcon />}/>

        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            {addresses.entrySeq().map(([key, value]) => (
              <MenuItem key={ key }
                        onTouchTap={ this.handleRequestClose }
                        containerElement={ <Link to={`/wallet/account/${value.address}/send`}/>}
                        primaryText={ (<span>{ value.address }</span>) }
                        secondaryText={ value.balance.toString() }/>
            ))}

          </Menu>
        </Popover>
      </div>
    );
  }
}

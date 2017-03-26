import React from 'react';
import log from 'loglevel';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {grey800} from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import {List, ListItem} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import {WalletIcon, LogoutIcon} from './../Icons';
import IconButton from 'material-ui/IconButton';
import {logoutAction} from '../../redux/userActions';

import './mainLayout.css';

const styles = {
  margin: '10px 20px 20px 15px',
  paddingLeft: 200,

  div: {
    padding: '24px 24px 8px 24px',
    backgroundImage:  'url(' + require('../../assets/drawer_bg.svg') + ')',
    backgroundColor: '#fff',
    boxShadow: 'rgba(0, 0, 0, 0.5) 0 0 10px inset',
    height: 112
  },
  menu: {
    paddingTop: 8
  },
  menuItem: {
    color: grey800,
    fontSize: 14
  },
  menuItemInner: {
    paddingLeft: '54px'
  },
  appBar: {
    zIndex: 1400,
    position:'fixed'
  }
};

const AppBarTitle = muiThemeable()((props) => (
  <span>Chrono<span style={{color: props.muiTheme.palette.accent1Color}}>WAVES</span></span>
));

class MainLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: true};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  render() {

    const paddingLeft = (this.state.open ? 210 : 50);

    const style = {
      padding: '70px 20px 20px 20px',
      paddingLeft: paddingLeft + 20,
      transition: 'padding 450ms cubic-bezier(0.23, 1, 0.32, 1)'
    };

    return (
      <div>
        <AppBar
          style={ styles.appBar }
          title={ <AppBarTitle/> }
          iconElementRight={<IconButton onClick={ this.props.onLogout }><LogoutIcon/></IconButton>}
          onLeftIconButtonTouchTap={ this.handleToggle }
        />
        <Drawer open={this.state.open} containerStyle={{paddingTop: 56, backgroundColor: '#fff'}} width={180}>

          <div style={ styles.div }>

          </div>

          <List style={ styles.menu }>

            <ListItem
              style={ styles.menuItem }
              innerDivStyle={ styles.menuItemInner }
              primaryText="Dashboard"
              leftIcon={<FontIcon className="material-icons">home</FontIcon>}
              containerElement={<Link activeClassName={'active'} to="/dashboard" />}/>

            <ListItem
              style={ styles.menuItem }
              innerDivStyle={ styles.menuItemInner }
              primaryText="Wallet"
              leftIcon={<WalletIcon />}
              containerElement={<Link activeClassName={'active'} to="/wallet"/>}/>

            <ListItem
              style={ styles.menuItem }
              innerDivStyle={ styles.menuItemInner }
              primaryText="Exchange"
              leftIcon={<FontIcon className="material-icons">compare_arrows</FontIcon>}/>
          </List>
        </Drawer>
        <div style={ style }>
          { this.props.children }
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => {
      log.debug('OnLogout clicked');
      dispatch(logoutAction());
    }
  }
};

export default connect(null, mapDispatchToProps)(MainLayout);

import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {grey800} from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import {List, ListItem} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import {WalletIcon} from './Icons';

const styles = {
  margin: '10px 20px 20px 15px',
  paddingLeft: 200,

  div: {
    padding: '24px 24px 8px 24px',
    backgroundImage:  'url(' + require('../assets/drawer_bg.svg') + ')',
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
  }
};

const AppBarTitle = muiThemeable()((props) => (
  <span>Chrono<span style={{color: props.muiTheme.palette.accent1Color}}>WAVES</span></span>
));

const MainLayout = (props) => (
  <div>
    <AppBar
      style={{zIndex: 1400}}
      title={<AppBarTitle/>}
      iconClassNameRight="muidocs-icon-navigation-expand-more"
    />
    <Drawer open={true} containerStyle={{paddingTop: 56, backgroundColor: '#fff'}} width={200}>

      <div style={styles.div}>

      </div>

      <List style={styles.menu}>

        <ListItem
          style={styles.menuItem}
          innerDivStyle={ styles.menuItemInner }
          primaryText="Dashboard"
          leftIcon={<FontIcon className="material-icons">home</FontIcon>}
          containerElement={<Link to="dashboard" />}/>

        <ListItem
          style={ styles.menuItem }
          innerDivStyle={ styles.menuItemInner }
          primaryText="Wallet"
          leftIcon={<WalletIcon />}
          containerElement={<Link to="wallet"/>}/>

        <ListItem
          style={styles.menuItem}
          innerDivStyle={ styles.menuItemInner }
          primaryText="Exchange"
          leftIcon={<FontIcon className="material-icons">compare_arrows</FontIcon>}/>
      </List>
    </Drawer>
    <div style={styles}>
      {props.children}
    </div>
  </div>
);


export default connect()(MainLayout);

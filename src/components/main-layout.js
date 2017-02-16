import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import muiThemeable from 'material-ui/styles/muiThemeable';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import {List, ListItem} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';

const style = {
  margin: '10px 20px 20px 15px',
  paddingLeft: 200,
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
    <Drawer open={true} containerStyle={{paddingTop: 100, backgroundColor: '#fff'}} width={200}>
      <List>

        <ListItem
          primaryText="Dashboard"
          leftIcon={<FontIcon className="material-icons">home</FontIcon>}
          containerElement={<Link to="dashboard" />}/>

        <ListItem
          primaryText="Wallet"
          leftIcon={<FontIcon className="material-icons">account_balance_wallet</FontIcon>}
          containerElement={<Link to="wallet"/>}/>

        <ListItem
          primaryText="Exchange"
          leftIcon={<FontIcon className="material-icons">compare_arrows</FontIcon>}/>
      </List>
    </Drawer>
    <div style={style}>
      {props.children}
    </div>
  </div>
);


export default connect()(MainLayout);

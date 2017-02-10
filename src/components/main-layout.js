import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import muiThemeable from 'material-ui/styles/muiThemeable';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import {List, ListItem} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';

const style = {
  margin: '80px 20px 20px 15px',
  paddingLeft: 200,
};

const AppBarTitle = muiThemeable()((props) => (
  <span>Chrono<span style={{color: props.muiTheme.palette.accent1Color}}>WAVES</span> {props.address}</span>
));

const MainLayout = (props) => (
  <div>
    <AppBar
      style={{zIndex: 1400}}
      title={<AppBarTitle address={props.address}/>}
      iconClassNameRight="muidocs-icon-navigation-expand-more"
    />
    <Drawer open={true} containerStyle={{paddingTop: 100, backgroundColor: '#fff'}} width={200}>
      <List>
        <ListItem
          primaryText="Wallet"
          leftIcon={<FontIcon className="material-icons">account_balance_wallet</FontIcon>}
          containerElement={<Link to="wallet"/>}/>
        <ListItem
          primaryText="History"
          leftIcon={<FontIcon className="material-icons">history</FontIcon>}
          containerElement={<Link to="transactions"/>}/>
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

const mapStateToProps = (state) => {
  return {
    address: state.session.address
  };
};

export default connect(mapStateToProps)(MainLayout);

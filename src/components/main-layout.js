import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import muiThemeable from 'material-ui/styles/muiThemeable';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

const style = {
  margin: '80px 20px 20px 15px',
  paddingLeft: 250,
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
      <MenuItem><Link to="transactions">Wallet</Link></MenuItem>
      <MenuItem>Exchange</MenuItem>
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

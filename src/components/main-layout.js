import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

const style = {
  margin: '80px 20px 20px 15px',
  paddingLeft: 250,
};

const MainLayout = (props) => (
  <div>
    <AppBar
      style={{zIndex: 1400}}
      title="ChronoWAVES"
      iconClassNameRight="muidocs-icon-navigation-expand-more"
    />
    <Drawer open={true} containerStyle={{paddingTop: 100, backgroundColor: '#fff'}} width={200}>
      <MenuItem>Wallet</MenuItem>
      <MenuItem>Exchange</MenuItem>
    </Drawer>
    <div style={style}>
      {props.children}
    </div>
  </div>
);

export default MainLayout;

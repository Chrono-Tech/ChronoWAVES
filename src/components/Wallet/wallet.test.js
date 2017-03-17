import React from 'react';
import ReactDOM from 'react-dom';
import {Wallet} from './wallet';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MuiThemeProvider><Wallet accounts={[]} balances={{}}/></MuiThemeProvider>, div);
});

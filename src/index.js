import React from 'react';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './index.css';
import chronoTheme from './chrono-theme';

import store from './redux/store';
import router from './router';

import log from 'loglevel';

log.setLevel('debug');

// Needed for onTouchTap
injectTapEventPlugin();


ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={ chronoTheme }>
      {router}
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);




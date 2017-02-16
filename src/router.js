import React from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

import App from './app';
import MainLayout from './components/main-layout';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import EnsureLoggedInContainer from './components/ensure-logged-in-container';
import Wallet from './components/Wallet';
import Account from './components/Account';

const router = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="login" component={Login}/>

      <Route component={EnsureLoggedInContainer}>
        <Route component={MainLayout}>
          <IndexRoute component={Dashboard}/>
          <Route path="dashboard" component={Dashboard}/>
          <Route path="wallet" component={Wallet} />
          <Route path="account/:address" component={Account} />
        </Route>
      </Route>
    </Route>
  </Router>
);

export default router;

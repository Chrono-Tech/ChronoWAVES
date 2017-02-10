import React from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

import App from './app';
import MainLayout from './components/main-layout';
import Dashboard from './components/dashboard';
import Login from './components/login';
import EnsureLoggedInContainer from './components/ensure-logged-in-container';
import Transactions from './components/history/transactions';
import Balances from './components/wallet/balances';

const router = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="login" component={Login}/>

      <Route component={EnsureLoggedInContainer}>
        <Route component={MainLayout}>
          <IndexRoute component={Dashboard}/>
          <Route path="dashboard" component={Dashboard}/>
          <Route path="transactions" component={Transactions}/>
          <Route path="wallet" component={Balances} />
        </Route>
      </Route>
    </Route>
  </Router>
);

export default router;

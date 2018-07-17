import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

// components
import LandingPage from '../pages/LandingPage';
import DashboardPage from '../pages/DashboardPage';

// custom routes
import LayoutRoute from './LayoutRoute';

const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <LayoutRoute exact path="/" component={LandingPage} />
      <LayoutRoute exact path="/dashboard" component={DashboardPage} />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;

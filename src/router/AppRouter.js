import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';

// components
import LandingPage from '../pages/LandingPage';
import DashboardPage from '../pages/DashboardPage';

const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route
        exact
        path="/"
        component={LandingPage}
      />
      <Route
        exact
        path="/dashboard"
        component={DashboardPage}
      />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;

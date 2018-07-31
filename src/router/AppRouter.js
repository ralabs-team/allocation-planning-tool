import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

// components
import {
  DashboardPage,
  EmployeesPage,
  LandingPage,
  ProjectsPage,
} from '../pages';

// custom routes
import LayoutRoute from './LayoutRoute';

const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <LayoutRoute exact path="/" component={LandingPage} />
      <LayoutRoute exact path="/dashboard" component={DashboardPage} />
      <LayoutRoute exact path="/employees" component={EmployeesPage} />
      <LayoutRoute exact path="/projects" component={ProjectsPage} />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;

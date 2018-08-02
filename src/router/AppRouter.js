import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

// components
import {
  DashboardPage,
  EmployeesPage,
  LandingPage,
  ProjectsPage,
  SettingsPage,
} from '../pages';

// custom routes
import LayoutRoute from './LayoutRoute';

const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <LayoutRoute exact path="/" component={LandingPage} />
      <LayoutRoute exact path="/dashboard" component={DashboardPage} renderSearch />
      <LayoutRoute exact path="/employees" component={EmployeesPage} renderSearch />
      <LayoutRoute exact path="/projects" component={ProjectsPage} renderSearch />
      <LayoutRoute exact path="/settings" component={SettingsPage} />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;

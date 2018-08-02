import React from 'react';
import { HashRouter, Switch } from 'react-router-dom';

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
  <HashRouter>
    <Switch>
      <LayoutRoute exact path="/" component={LandingPage} />
      <LayoutRoute exact path="/dashboard" component={DashboardPage} renderSearch />
      <LayoutRoute exact path="/employees" component={EmployeesPage} renderSearch />
      <LayoutRoute exact path="/projects" component={ProjectsPage} renderSearch />
      <LayoutRoute exact path="/settings" component={SettingsPage} />
    </Switch>
  </HashRouter>
);

export default AppRouter;

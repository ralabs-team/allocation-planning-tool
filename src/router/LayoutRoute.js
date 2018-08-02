import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import Layout from '../components/layout/Layout';

const LayoutRoute = (props) => {
  const renderRoute = (renderRouteProps) => {
    const { component: RouteComponent } = props;
    const routeProps = renderRouteProps;

    routeProps.computedMatch = props.computedMatch;

    return (
      <Layout {...routeProps} renderSearch={props.renderSearch}>
        <RouteComponent />
      </Layout>
    );
  };

  return (
    <Route render={renderRoute} />
  );
};

LayoutRoute.propTypes = {
  component: PropTypes.func.isRequired, // eslint-disable-line
  computedMatch: PropTypes.object, // eslint-disable-line
  renderSearch: PropTypes.bool, // eslint-disable-line
};
LayoutRoute.defaultProps = {
  renderSearch: false,
};

export default LayoutRoute;

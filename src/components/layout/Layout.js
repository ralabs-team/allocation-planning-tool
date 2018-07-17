import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Layout = (props) => {
  const childProps = _.clone(props);

  delete childProps.children;

  return (
    <div className="layout">
      <div className="main-content">{React.cloneElement(props.children, { ...childProps })}</div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;

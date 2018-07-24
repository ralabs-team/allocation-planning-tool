import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Modal from '../shared//modals/Modal';
import Header from './header/Header';

const Layout = (props) => {
  const childProps = _.clone(props);

  delete childProps.children;

  return (
    <div className="layout">
      <Header />

      <Modal />

      <div className="main-content">{React.cloneElement(props.children, { ...childProps })}</div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;

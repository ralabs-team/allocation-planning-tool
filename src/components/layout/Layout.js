import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Modal from '../shared//modals/Modal';
import Header from './header/Header';

const Layout = (props) => {
  const childProps = _.clone(props);

  delete childProps.children;
  delete childProps.renderSearch;
  childProps.page = props.location.pathname.slice(1);
  return (
    <div className="layout">
      <Header
        {...childProps}
        renderSearch={props.renderSearch}
      />

      <Modal />

      <div className="main-content">{React.cloneElement(props.children, { ...childProps })}</div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  renderSearch: PropTypes.bool,
  location: PropTypes.objectOf(PropTypes.string).isRequired,
};
Layout.defaultProps = {
  renderSearch: false,
};

export default Layout;

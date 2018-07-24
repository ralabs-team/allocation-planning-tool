import React from 'react';
import { Link } from 'react-router-dom';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SearchPanel from './SearchPanel';
import './header.css';

const Header = props => (
  <div className="header">
    <h1>Allocation Planning Tool</h1>

    <div>
      <Link to="/">Main Page</Link>
      {' '}
      <Link to="/dashboard">Dashboard</Link>
    </div>

    <SearchPanel {...props} />
  </div>
);

const mapStateToProps = state => ({
  projects: state.projects.allProjects,
  employees: state.users.allUsers,
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

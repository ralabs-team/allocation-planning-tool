import React from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SearchPanel from './SearchPanel';
import { setSearch } from '../../../actions';

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
  searchData: state.search.searchData,
});

const mapDispatchToProps = dispatch => ({
  setSearch: bindActionCreators(setSearch, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

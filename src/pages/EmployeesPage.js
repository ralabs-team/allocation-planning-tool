import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

// components
import EmployeesList from '../components/employees/EmployeesList';
// actions
import { getUsers } from '../actions';

class EmployeesPage extends Component {
  static propTypes = {
    getUsers: PropTypes.func.isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    searchData: PropTypes.objectOf(PropTypes.array).isRequired,
    sortUp: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    const { users: employees, sortUp, searchData } = this.props;
    const sortedEmployees = sortUp ? employees : _.clone(employees).reverse();
    const filteredEmployees = !searchData.employeesIds ?
      sortedEmployees : sortedEmployees.filter(item => searchData.employeesIds.includes(item._id));

    return (
      <div>
        {this.props.users.length && <EmployeesList users={filteredEmployees} /> }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users.allUsers,
  searchData: state.search.searchData,
  sortUp: state.search.sortUp,
});

const mapDispatchToProps = dispatch => ({
  getUsers: () => { dispatch(getUsers()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesPage);

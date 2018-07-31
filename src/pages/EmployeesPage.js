import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// components
import EmployeesList from '../components/employees/EmployeesList';
// actions
import { getUsers } from '../actions';

class EmployeesPage extends Component {
  static propTypes = {
    getUsers: PropTypes.func.isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    return (
      <div>
        { this.props.users.length && <EmployeesList users={this.props.users} /> }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users.allUsers,
});

const mapDispatchToProps = dispatch => ({
  getUsers: () => { dispatch(getUsers()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesPage);

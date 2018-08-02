import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
// material-ui
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

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

  renderEmployeesList() {
    const { users: employees, sortUp, searchData } = this.props;
    const sortedEmployees = sortUp ? employees : _.clone(employees).reverse();
    const filteredEmployees = !searchData.employeesIds ?
      sortedEmployees : sortedEmployees.filter(item => searchData.employeesIds.includes(item._id));

    return filteredEmployees.map((employee) => {
      const {
        _id, firstName, lastName, position, avatar,
      } = employee;

      return (
        [
          <ListItem
            key={_id}
            classes={{ root: 'list-item' }}
          >
            <Avatar src={avatar}>
              {!avatar && `${firstName.slice(0, 1)}${lastName.slice(0, 1)}`}
            </Avatar>

            <ListItemText
              primary={`${firstName} ${lastName}`}
              secondary={position}
            />
          </ListItem>,
          <Divider key="devider" />,
        ]
      );
    });
  }

  render() {
    return (
      <div className="list">
        <List>
          {this.props.users.length && this.renderEmployeesList()}
        </List>
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

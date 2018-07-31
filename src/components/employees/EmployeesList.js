import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

import './employees-list.css';

const EmployeesList = (props) => {
  const renderEmployees = () =>
    props.users.map((user) => {
      const {
        _id, firstName, lastName, position, avatar,
      } = user;

      return (
        [
          <ListItem
            key={_id}
            classes={{ root: 'employees-list-item' }}
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

  return (
    <div className="employees-list">
      <List>
        {renderEmployees()}
      </List>
    </div>
  );
};

EmployeesList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default EmployeesList;

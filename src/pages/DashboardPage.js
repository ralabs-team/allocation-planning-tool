import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// components
import TimelineCalendar from '../components/TimelineCalendar';

// actions
import { getUsers, getSchedulers, openModal, getProjects, changeAllocation } from '../actions';

class DashboardPage extends Component {
  static propTypes = {
    getUsers: PropTypes.func.isRequired,
    getSchedulers: PropTypes.func.isRequired,
    getProjects: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    schedulers: PropTypes.array.isRequired, // eslint-disable-line
    users: PropTypes.array.isRequired, // eslint-disable-line
    changeAllocation: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getUsers();
    this.props.getSchedulers();
    this.props.getProjects();
  }

  render() {
    const { users, schedulers } = this.props;

    return (
      <div>
        <h1>Dashboard Page</h1>

        <div>
          <Link to="/">Main Page</Link>
        </div>

        <div className="calendar">
          {
            users.length &&
            <TimelineCalendar
              employees={users}
              scheduler={schedulers}
              openModal={this.props.openModal}
              changeAllocation={this.props.changeAllocation}
            />
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { users, schedulers } = state;

  return ({
    users: users.allUsers,
    schedulers: schedulers.allSchedulers,
  });
};

const mapDispatchToProps = dispatch => ({
  getUsers: bindActionCreators(getUsers, dispatch),
  getSchedulers: bindActionCreators(getSchedulers, dispatch),
  openModal: bindActionCreators(openModal, dispatch),
  getProjects: bindActionCreators(getProjects, dispatch),
  changeAllocation: bindActionCreators(changeAllocation, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);

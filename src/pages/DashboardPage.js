import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// components
import TimelineCalendar from '../components/callendar/TimelineCalendar';

// actions
import { getUsers, getAllocations, openModal, getProjects, changeAllocations } from '../actions';

class DashboardPage extends Component {
  static propTypes = {
    getUsers: PropTypes.func.isRequired,
    getAllocations: PropTypes.func.isRequired,
    getProjects: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    allocations: PropTypes.array.isRequired, // eslint-disable-line
    users: PropTypes.array.isRequired, // eslint-disable-line
    changeAllocations: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getUsers();
    this.props.getAllocations();
    this.props.getProjects();
  }

  render() {
    const { users, allocations } = this.props;

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
              allocations={allocations}
              openModal={this.props.openModal}
              changeAllocations={this.props.changeAllocations}
            />
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { users, allocations } = state;

  return ({
    users: users.allUsers,
    allocations: allocations.allAllocations,
  });
};

const mapDispatchToProps = dispatch => ({
  getUsers: bindActionCreators(getUsers, dispatch),
  getAllocations: bindActionCreators(getAllocations, dispatch),
  openModal: bindActionCreators(openModal, dispatch),
  getProjects: bindActionCreators(getProjects, dispatch),
  changeAllocations: bindActionCreators(changeAllocations, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);

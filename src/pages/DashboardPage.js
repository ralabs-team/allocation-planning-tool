import React, { Component } from 'react';
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
    searchData: PropTypes.object.isRequired, // eslint-disable-line
  };

  componentDidMount() {
    this.props.getUsers();
    this.props.getAllocations();
    this.props.getProjects();
  }

  render() {
    const { users, allocations, searchData } = this.props;

    return (
      <div>
        {
          users.length &&
          <TimelineCalendar
            employees={users}
            allocations={allocations}
            openModal={this.props.openModal}
            changeAllocations={this.props.changeAllocations}
            searchData={searchData}
          />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { users, allocations, search } = state;

  return ({
    users: users.allUsers,
    allocations: allocations.allAllocations,
    searchData: search.searchData,
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

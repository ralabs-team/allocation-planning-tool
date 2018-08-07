import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

// components
import TimelineCalendar from '../components/callendar/TimelineCalendar';

// actions
import { getAllocations, openModal, changeAllocations } from '../actions';

class DashboardPage extends Component {
  static propTypes = {
    getAllocations: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    allocations: PropTypes.arrayOf(PropTypes.object).isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    changeAllocations: PropTypes.func.isRequired,
    searchData: PropTypes.object.isRequired, // eslint-disable-line
    sortUp: PropTypes.bool.isRequired,
    visibleMonth: PropTypes.number.isRequired,
  };

  componentDidMount() {
    this.props.getAllocations();
  }

  render() {
    const {
      users, allocations, searchData, sortUp, visibleMonth,
    } = this.props;

    return (
      <div>
        {users.length &&
          <TimelineCalendar
            employees={users}
            allocations={allocations}
            openModal={this.props.openModal}
            changeAllocations={this.props.changeAllocations}
            searchData={searchData}
            sortUp={sortUp}
            minTime={visibleMonth}
            maxTime={moment(visibleMonth).endOf('M').valueOf()}
          />
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  visibleMonth: state.calendar.visibleMonth,
  users: state.users.allUsers,
  allocations: state.allocations.allAllocations,
  searchData: state.search.searchData,
  sortUp: state.search.sortUp,
});

const mapDispatchToProps = dispatch => ({
  getAllocations: bindActionCreators(getAllocations, dispatch),
  openModal: bindActionCreators(openModal, dispatch),
  changeAllocations: bindActionCreators(changeAllocations, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);

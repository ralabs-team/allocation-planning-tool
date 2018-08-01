import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Timeline from 'react-calendar-timeline/lib';
import 'react-calendar-timeline/lib/Timeline.css';
import _ from 'lodash';
import autoBind from 'react-autobind';

const minZoom = 1000 * 60 * 60 * 24 * 7; // week
const maxZoom = 1000 * 60 * 60 * 24 * 30; // month

class TimelineCalendar extends React.Component {
  visibleTimeStart = moment().startOf('w').valueOf();
  visibleTimeEnd = moment().endOf('w').valueOf();

  constructor(props) {
    super(props);
    autoBind(this);
  }
  changeAllocations(id, allocation) {
    const allocations = _.clone(this.props.allocations);
    const index = _.findIndex(this.props.allocations, ['_id', id]);
    allocations.splice(index, 1, allocation);

    this.props.changeAllocations(allocations);
  }

  onItemMove(itemId, dragTime, newGroupIndex) {
    const user = this.props.employees[newGroupIndex];
    const allocation = _.find(this.props.allocations, ['_id', itemId]);
    const updatedAllocation = {
      ...allocation,
      startTime: new Date(dragTime),
      endTime: new Date(dragTime + (allocation.endTime - allocation.startTime)),
      userId: user._id,
      updateAt: new Date(),
      updateBy: '001',
    };

    this.changeAllocations(itemId, updatedAllocation);
  }

  onItemResize(itemId, time, edge) {
    const changedTime = edge === 'right' ? 'endTime' : 'startTime';
    const allocation = _.find(this.props.allocations, ['_id', itemId]);
    const updatedAllocation = {
      ...allocation,
      [changedTime]: new Date(time),
      updateAt: new Date(),
      updateBy: '001',
    };

    this.changeAllocations(itemId, updatedAllocation);
  }

  onItemSelect(itemId, e, time) {
    console.log('itemId ', itemId);
    console.log('e ', e);
    console.log('time ', time);
  }

  onItemDoubleClick(itemId) {
    const allocation = _.find(this.props.allocations, ['_id', itemId]);
    const employee = _.find(this.props.employees, ['_id', allocation.userId]);

    const modalData = {
      type: 'ALLOCATION',
      mode: 'edit',
      data: {
        employee,
        initialTime: null,
        allocation,
      },
    };

    this.props.openModal(modalData);
  }

  onCanvasClick(group, time) {
    // console.log(moment(time).format('DD-MM'), group);
    const modalData = {
      type: 'ALLOCATION',
      mode: 'create',
      data: {
        employee: _.find(this.props.employees, ['_id', group]),
        initialTime: time,
        allocation: null,
      },
    };

    this.props.openModal(modalData);
  }

  render() {
    const {
      employees, allocations, searchData, sortUp,
    } = this.props;

    const sortedEmployees = sortUp ? employees : _.clone(employees).reverse();

    const filteredEmployees = !searchData.employeesIds ?
      sortedEmployees : sortedEmployees.filter(item => searchData.employeesIds.includes(item._id));

    const groups = filteredEmployees.map(item => ({
      id: item._id,
      title: `${item.firstName} ${item.lastName}`,
    }));

    const filteredAllocations = !searchData.projectsIds ?
      allocations : allocations.filter(item => searchData.projectsIds.includes(item.projectId));

    const items = filteredAllocations.map(item => ({
      ...item,
      id: item._id,
      group: item.userId,
      title: item.taskName,
      start_time: moment(item.startTime),
      end_time: moment(item.endTime),
    }));
    const dragSnap = 24 * 60 * 60 * 1000; // one day

    return (
      <Timeline
        groups={groups}
        items={items}
        visibleTimeStart={this.visibleTimeStart}
        visibleTimeEnd={this.visibleTimeEnd}
        sidebarContent={<h2>Ralabs</h2>}
        sidebarWidth={260}
        dragSnap={dragSnap}
        minResizeWidth={24}
        lineHeight={100}
        headerLabelGroupHeight={40}
        headerLabelHeight={40}
        itemHeightRatio={0.3}
        minZoom={minZoom}
        maxZoom={maxZoom}
        stackItems
        canResize="both"
        onItemMove={this.onItemMove}
        onItemResize={this.onItemResize}
        onItemSelect={this.onItemSelect}
        onItemDoubleClick={this.onItemDoubleClick}
        onCanvasClick={this.onCanvasClick}
      />
    );
  }
}

TimelineCalendar.propTypes = {
  employees: PropTypes.array.isRequired, // eslint-disable-line
  allocations: PropTypes.array.isRequired, // eslint-disable-line
  openModal: PropTypes.func.isRequired,
  changeAllocations: PropTypes.func.isRequired,
  searchData: PropTypes.object.isRequired, // eslint-disable-line
  sortUp: PropTypes.bool.isRequired,
};

export default TimelineCalendar;

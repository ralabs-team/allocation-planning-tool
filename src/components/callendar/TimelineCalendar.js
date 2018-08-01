import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Timeline from 'react-calendar-timeline/lib';
import 'react-calendar-timeline/lib/Timeline.css';
import _ from 'lodash';

const TimelineCalendar = (props) => {
  const changeAllocations = (id, allocation) => {
    const allocations = _.clone(props.allocations);
    const index = _.findIndex(props.allocations, ['_id', id]);
    allocations.splice(index, 1, allocation);

    props.changeAllocations(allocations);
  };

  const onItemMove = (itemId, dragTime, newGroupIndex) => {
    const user = props.employees[newGroupIndex];
    const allocation = _.find(props.allocations, ['_id', itemId]);
    const updatedAllocation = {
      ...allocation,
      startTime: new Date(dragTime),
      endTime: new Date(dragTime + (allocation.endTime - allocation.startTime)),
      userId: user._id,
      updateAt: new Date(),
      updateBy: '001',
    };

    changeAllocations(itemId, updatedAllocation);
  };

  const onItemResize = (itemId, time, edge) => {
    const changedTime = edge === 'right' ? 'endTime' : 'startTime';
    const allocation = _.find(props.allocations, ['_id', itemId]);
    const updatedAllocation = {
      ...allocation,
      [changedTime]: new Date(time),
      updateAt: new Date(),
      updateBy: '001',
    };

    changeAllocations(itemId, updatedAllocation);
  };

  const onItemSelect = (itemId, e, time) => {
    console.log('itemId ', itemId);
    console.log('e ', e);
    console.log('time ', time);
  };

  const onItemDoubleClick = (itemId) => {
    const allocation = _.find(props.allocations, ['_id', itemId]);
    const employee = _.find(props.employees, ['_id', allocation.userId]);

    const modalData = {
      type: 'ALLOCATION',
      mode: 'edit',
      data: {
        employee,
        initialTime: null,
        allocation,
      },
    };

    props.openModal(modalData);
  };

  const onCanvasClick = (group, time) => {
    const modalData = {
      type: 'ALLOCATION',
      mode: 'create',
      data: {
        employee: _.find(props.employees, ['_id', group]),
        initialTime: time,
        allocation: null,
      },
    };

    props.openModal(modalData);
  };

  const {
    employees, allocations, searchData, sortUp,
  } = props;

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
  const calendarZoom = 24 * 60 * 60 * 1000 * 30; // one month

  return (
    <Timeline
      groups={groups}
      items={items}
      visibleTimeStart={moment().add(-12, 'days').valueOf()}
      visibleTimeEnd={moment().add(12, 'days').valueOf()}
      sidebarContent={<h2>Ralabs</h2>}
      sidebarWidth={260}
      dragSnap={dragSnap}
      minResizeWidth={24}
      lineHeight={100}
      headerLabelGroupHeight={40}
      headerLabelHeight={40}
      itemHeightRatio={0.3}
      minZoom={calendarZoom}
      maxZoom={calendarZoom}
      stackItems
      canResize="both"
      onItemMove={onItemMove}
      onItemResize={onItemResize}
      onItemSelect={onItemSelect}
      onItemDoubleClick={onItemDoubleClick}
      onCanvasClick={onCanvasClick}
    />
  );
};

TimelineCalendar.propTypes = {
  employees: PropTypes.array.isRequired, // eslint-disable-line
  allocations: PropTypes.array.isRequired, // eslint-disable-line
  openModal: PropTypes.func.isRequired,
  changeAllocations: PropTypes.func.isRequired,
  searchData: PropTypes.object.isRequired, // eslint-disable-line
  sortUp: PropTypes.bool.isRequired,
};

export default TimelineCalendar;

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Timeline from 'react-calendar-timeline/lib';
import 'react-calendar-timeline/lib/Timeline.css';
import _ from 'lodash';

const TimelineCalendar = (props) => {
  const onItemMove = (itemId, dragTime, newGroupIndex) => {
    const user = props.employees[newGroupIndex];

    const newAllocations = props.allocations.map((allocation) => {
      if (allocation._id === itemId) {
        return ({
          ...allocation,
          startTime: new Date(dragTime),
          endTime: new Date(dragTime + (allocation.endTime - allocation.startTime)),
          userId: user._id,
        });
      }

      return allocation;
    });

    props.changeAllocations(newAllocations);
  };

  const onItemResize = (itemId, time, edge) => {
    const newAllocations = props.allocations.map((allocation) => {
      if (allocation._id === itemId) {
        const changedTime = edge === 'right' ? 'endTime' : 'startTime';

        return ({
          ...allocation,
          [changedTime]: new Date(time),
        });
      }

      return allocation;
    });

    props.changeAllocations(newAllocations);
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

  const onCanvasDoubleClick = (group, time) => {
    const modalData = {
      type: 'ALLOCATION',
      mode: 'create',
      data: {
        employee: props.employees[group - 1],
        initialTime: time,
        allocation: null,
      },
    };

    props.openModal(modalData);
  };

  const { employees, allocations, searchData } = props;

  const filteredEmployees = !searchData.employeesIds ?
    employees : employees.filter(item => searchData.employeesIds.includes(item._id));

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
      onCanvasDoubleClick={onCanvasDoubleClick}
    />
  );
};

TimelineCalendar.propTypes = {
  employees: PropTypes.array.isRequired, // eslint-disable-line
  allocations: PropTypes.array.isRequired, // eslint-disable-line
  openModal: PropTypes.func.isRequired,
  changeAllocations: PropTypes.func.isRequired,
  searchData: PropTypes.object.isRequired, // eslint-disable-line
};

export default TimelineCalendar;

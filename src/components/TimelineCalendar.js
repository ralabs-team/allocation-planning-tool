import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Timeline from 'react-calendar-timeline/lib';
import 'react-calendar-timeline/lib/Timeline.css';


const TimelineCalendar = (props) => {
  const { employees, scheduler } = props;

  const groups = employees.map(item => ({
    id: item._id,
    title: `${item.firstName} ${item.lastName}`,
  }));

  const items = scheduler.map(item => ({
    ...item,
    id: item._id,
    group: item.userId,
    title: item.taskName,
    start_time: moment(item.startTime),
    end_time: moment(item.endTime),
  }));

  const onItemMove = (itemId, dragTime, newGroupIndex) => {
    const user = props.employees[newGroupIndex];

    const newScheduler = props.scheduler.map((allocation) => {
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

    props.changeAllocation(newScheduler);
  };

  const onItemResize = (itemId, time, edge) => {
    console.log('itemId ', itemId);
    console.log('time ', time);
    console.log('edge ', edge);
  };

  const onItemSelect = (itemId, e, time) => {
    console.log('itemId ', itemId);
    console.log('e ', e);
    console.log('time ', time);
  };

  const onItemDoubleClick = (itemId, e, time) => {
    /** will use for open task details */
    console.log('itemId ', itemId);
    console.log('e ', e);
    console.log('time ', time);
  };

  const onCanvasDoubleClick = (group, time) => {
    const modalData = {
      type: 'ALLOCATION',
      data: {
        employee: employees[group - 1],
        time,
      },
    };

    props.openModal(modalData);
  };
  const dragSnap = 24 * 60 * 60 * 1000; // one day
  const calendarZoom = 24 * 60 * 60 * 1000 * 30; // one month

  return (
    <Timeline
      groups={groups}
      items={items}
      visibleTimeStart={moment().add(-12, 'days').valueOf()}
      visibleTimeEnd={moment().add(12, 'days').valueOf()}
      sidebarContent={<div>Ralabs</div>}
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
  scheduler: PropTypes.array.isRequired, // eslint-disable-line
  openModal: PropTypes.func.isRequired,
  changeAllocation: PropTypes.func.isRequired,
};

export default TimelineCalendar;

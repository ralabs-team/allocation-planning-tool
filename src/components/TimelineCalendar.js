import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Timeline from 'react-calendar-timeline/lib';
// make sure you include the timeline stylesheet or the timeline will not be styled
import 'react-calendar-timeline/lib/Timeline.css';


const TimelineCalendar = (props) => {
  const { employees, scheduler } = props;

  const groups = employees.map((item) => {
    const { _id, firstName, lastName } = item;

    return {
      id: _id,
      title: `${firstName} ${lastName}`,
    };
  });
  const items = scheduler.map((item) => {
    const {
      _id, userId, taskName, startTime, endTime,
    } = item;

    return {
      ...item,
      id: _id,
      group: userId,
      title: taskName,
      start_time: startTime,
      end_time: endTime,
    };
  });

  const onItemMove = (itemId, dragTime, newGroupIndex) => {
    console.log('itemId ', itemId);
    console.log('dragTime ', dragTime);
    console.log('newGroupIndex ', newGroupIndex);
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

  return (
    <Timeline
      groups={groups}
      items={items}
      visibleTimeStart={moment().add(-12, 'days').valueOf()}
      visibleTimeEnd={moment().add(12, 'days').valueOf()}
      sidebarContent={<div>Ralabs</div>}
      dragSnap={24 * 60 * 60 * 1000}
      minResizeWidth={24}
      lineHeight={100}
      headerLabelGroupHeight={40}
      headerLabelHeight={40}
      itemHeightRatio={0.3}
      minZoom={24 * 60 * 60 * 1000 * 30}
      maxZoom={24 * 60 * 60 * 1000 * 30}
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
};

export default TimelineCalendar;

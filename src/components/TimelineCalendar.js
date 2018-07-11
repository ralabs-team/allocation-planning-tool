import React from 'react';

import Timeline from 'react-calendar-timeline/lib';
// make sure you include the timeline stylesheet or the timeline will not be styled
import 'react-calendar-timeline/lib/Timeline.css';
import moment from 'moment';


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

  return (
    <Timeline
      groups={groups}
      items={items}
      defaultTimeStart={moment().add(-12, 'days')}
      defaultTimeEnd={moment().add(12, 'days')}
      sidebarContent={<div>lala</div>}
      dragSnap={24 * 60 * 60 * 1000}
      minResizeWidth={24}
      lineHeight={50}
      headerLabelGroupHeight={60}
      headerLabelHeight={40}
      itemHeightRatio={0.3}
      minZoom={24 * 60 * 60 * 1000}
      stackItems
    />
  );
};

export default TimelineCalendar;

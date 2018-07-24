import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Timeline from 'react-calendar-timeline/lib';
import 'react-calendar-timeline/lib/Timeline.css';
import _ from 'lodash';

import InputFilter from './InputFilter';

class TimelineCalendar extends Component {
  static propTypes = {
    employees: PropTypes.array.isRequired, // eslint-disable-line
    allocations: PropTypes.array.isRequired, // eslint-disable-line
    openModal: PropTypes.func.isRequired,
    changeAllocations: PropTypes.func.isRequired,
  };

  state = {
    search: '',
  }

  onItemMove = (itemId, dragTime, newGroupIndex) => {
    const user = this.props.employees[newGroupIndex];

    const newAllocations = this.props.allocations.map((allocation) => {
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

    this.props.changeAllocations(newAllocations);
  }

  onItemResize = (itemId, time, edge) => {
    const newAllocations = this.props.allocations.map((allocation) => {
      if (allocation._id === itemId) {
        const changedTime = edge === 'right' ? 'endTime' : 'startTime';

        return ({
          ...allocation,
          [changedTime]: new Date(time),
        });
      }

      return allocation;
    });

    this.props.changeAllocations(newAllocations);
  };

  onItemSelect = (itemId, e, time) => {
    console.log('itemId ', itemId);
    console.log('e ', e);
    console.log('time ', time);
  };

  onItemDoubleClick = (itemId) => {
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
  };

  onCanvasDoubleClick = (group, time) => {
    const modalData = {
      type: 'ALLOCATION',
      mode: 'create',
      data: {
        employee: this.props.employees[group - 1],
        initialTime: time,
        allocation: null,
      },
    };

    this.props.openModal(modalData);
  };

  handleSearch = (search) => {
    this.setState({ search });
  };

  render() {
    const { employees, allocations } = this.props;
    const groups = employees.map(item => ({
      id: item._id,
      title: `${item.firstName} ${item.lastName}`,
    }));
    const filteredGroups = groups.filter(item =>
      item.title.toLowerCase().includes(this.state.search));
    const items = allocations.map(item => ({
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
        groups={filteredGroups}
        items={items}
        visibleTimeStart={moment().add(-12, 'days').valueOf()}
        visibleTimeEnd={moment().add(12, 'days').valueOf()}
        sidebarContent={<InputFilter handleChange={this.handleSearch} />}
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
        onItemMove={this.onItemMove}
        onItemResize={this.onItemResize}
        onItemSelect={this.onItemSelect}
        onItemDoubleClick={this.onItemDoubleClick}
        onCanvasDoubleClick={this.onCanvasDoubleClick}
      />
    );
  }
}

export default TimelineCalendar;

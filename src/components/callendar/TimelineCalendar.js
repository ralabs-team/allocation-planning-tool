import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/uk';
import Timeline, {
  TimelineMarkers,
  TodayMarker,
} from 'react-calendar-timeline/lib';
import _ from 'lodash';
import autoBind from 'react-autobind';
import CommentIcon from '@material-ui/icons/ModeComment';
import 'react-calendar-timeline/lib/Timeline.css';
import './calendar.css';
import { getVisiblePeriod, isWeekend } from './helpers';
import PopUp from './PopUp';
import Control from './Control';
import logo from './icon.png';

moment.locale('en-gb');

const minZoom = 1000 * 60 * 60; // 1 hour
const maxZoom = 1000 * 60 * 60 * 24 * 30; // month
const dragSnap = 60 * 60 * 1000 * 24; // day

class TimelineCalendar extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);

    const { employees, searchData } = this.props;

    this.state = {
      filteredEmployees: employees,
      employeesIds: searchData.employeesIds, // eslint-disable-line
      isOpenPopup: false,
      popupData: {},
    };

    const { minDate, maxDate } = getVisiblePeriod(this.props.minTime);
    this.visibleTimeStart = minDate.valueOf();
    this.visibleTimeEnd = maxDate.valueOf();
  }
  setZoom(value) {
    const start = this.visibleTimeStart + value;
    const end = this.visibleTimeEnd - value;
    const delta = end - start;
    const isCorrectDelta = _.inRange(delta, minZoom, maxZoom + 1);
    if (!isCorrectDelta) return;

    if (start <= this.props.minTime) {
      this.visibleTimeStart = this.props.minTime;
      this.visibleTimeEnd = this.props.minTime + delta;
    } else if (end >= this.props.maxTime) {
      this.visibleTimeEnd = this.props.maxTime;
      this.visibleTimeStart = this.visibleTimeEnd - delta;
    } else {
      this.visibleTimeStart = start;
      this.visibleTimeEnd = end;
    }
    this.forceUpdate();
  }

  componentWillReceiveProps(props) {
    if (this.props.minTime !== props.minTime) {
      const { minDate, maxDate } = getVisiblePeriod(props.minTime);
      this.visibleTimeStart = minDate.valueOf();
      this.visibleTimeEnd = maxDate.valueOf();
    }
    const newEmployeesIds = props.searchData.employeesIds;
    const { employeesIds } = this.state;

    if ((newEmployeesIds && (!employeesIds || newEmployeesIds.length !== employeesIds.length)) ||
      (!newEmployeesIds && employeesIds)) {
      const filteredEmployees = !newEmployeesIds ?
        props.employees : props.employees.filter(item => newEmployeesIds.includes(item._id));

      this.setState({
        employeesIds: newEmployeesIds,
        filteredEmployees,
      });
    }
  }

  openNewAllocationModal(group, time) {
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

  changeAllocations(id, allocation) {
    const allocations = _.clone(this.props.allocations);
    const index = _.findIndex(this.props.allocations, ['_id', id]);
    allocations.splice(index, 1, allocation);

    this.props.changeAllocations(allocations);
  }

  // calendar handlers
  onItemMove(itemId, dragTime, newGroupIndex) {
    const allocation = _.find(this.props.allocations, ['_id', itemId]);
    const startTime = new Date(dragTime);
    const endTime = new Date(dragTime + (allocation.endTime - allocation.startTime));
    if (isWeekend(startTime) || isWeekend(endTime)) return;

    const user = this.state.filteredEmployees[newGroupIndex];
    const updatedAllocation = {
      ...allocation,
      startTime,
      endTime,
      userId: user._id,
      updateAt: new Date(),
      updateBy: '001',
    };

    this.changeAllocations(itemId, updatedAllocation);
  }

  onItemResize(itemId, time, edge) {
    const changedTime = edge === 'right' ? 'endTime' : 'startTime';
    const correctedTime = changedTime === 'endTime' ? time : (time + 60 * 1000);
    if (isWeekend(correctedTime)) return;

    const allocation = _.find(this.props.allocations, ['_id', itemId]);
    const updatedAllocation = {
      ...allocation,
      [changedTime]: new Date(correctedTime),
      updateAt: new Date(),
      updateBy: '001',
    };

    this.changeAllocations(itemId, updatedAllocation);
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
    if (!isWeekend(time)) {
      this.openNewAllocationModal(group, time);
    } else {
      this.setState({
        isOpenPopup: true,
        popupData: {
          group,
          time,
        },
      });
    }
  }

  onTimeChange(visibleTimeStart, visibleTimeEnd, updateScrollCanvas) {
    const { minTime, maxTime } = this.props;
    let start;
    let end;
    if (visibleTimeStart < minTime && visibleTimeEnd > maxTime) {
      start = minTime;
      end = maxTime;
    } else if (visibleTimeStart < minTime) {
      start = minTime;
      end = minTime + (visibleTimeEnd - visibleTimeStart);
    } else if (visibleTimeEnd > maxTime) {
      start = maxTime - (visibleTimeEnd - visibleTimeStart);
      end = maxTime;
    } else {
      start = visibleTimeStart;
      end = visibleTimeEnd;
    }
    this.visibleTimeStart = start;
    this.visibleTimeEnd = end;
    updateScrollCanvas(start, end);
  }

  // calendar renderers
  itemRenderer({
    item,
    itemContext,
    getItemProps,
    getResizeProps,
  }) {
    const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();
    const { selected } = itemContext;
    const itemProps = getItemProps(item);
    const onWeekend = isWeekend(item.startTime) || isWeekend(item.endTime);
    const {
      top,
      left,
      width,
      height,
    } = itemProps.style;
    itemProps.style = {
      top,
      left,
      width,
      height,
    };
    return (
      <div
        {...itemProps}
        className={`rct-item ${onWeekend ? 'weekend' : ''} ${selected ? 'selected' : ''}`}
      >
        <div className="title-project">{item.projectTitle}</div>
        <p className="title-task">{item.taskTitle}</p>
        {!!item.notes.length && <CommentIcon className="icon" />}

        <div {...leftResizeProps} className="resizer" />
        <div {...rightResizeProps} className="resizer" />
      </div>
    );
  }

  groupRenderer({ group }) {
    return (
      <div className="group-item">
        <span className="name">{group.title}</span>
        {group.position &&
          <span className="position">{group.position}</span>
        }
      </div>
    );
  }

  render() {
    const {
      allocations, searchData, sortUp,
    } = this.props;
    const { filteredEmployees } = this.state;
    const sortedEmployees = sortUp ? filteredEmployees : _.clone(filteredEmployees).reverse();

    const groups = sortedEmployees.map(item => ({
      id: item._id,
      title: `${item.firstName} ${item.lastName}`,
      position: item.position,
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

    return (
      <div>
        <Timeline
          groups={groups}
          items={items}
          visibleTimeStart={this.visibleTimeStart}
          visibleTimeEnd={this.visibleTimeEnd}
          sidebarContent={<img src={logo} alt="logo" />}
          sidebarWidth={260}
          minResizeWidth={24}
          headerLabelGroupHeight={40}
          headerLabelHeight={40}
          itemHeightRatio={0.97}
          lineHeight={140}
          minZoom={minZoom}
          maxZoom={maxZoom}
          dragSnap={dragSnap}
          canResize="both"
          stackItems
          onItemMove={this.onItemMove}
          onItemResize={this.onItemResize}
          onItemSelect={this.onItemSelect}
          onItemDoubleClick={this.onItemDoubleClick}
          onCanvasClick={this.onCanvasClick}
          onTimeChange={this.onTimeChange}
          itemRenderer={this.itemRenderer}
          groupRenderer={this.groupRenderer}
          useResizeHandle
        >
          <TimelineMarkers>
            <TodayMarker>
              {({ styles }) => <div style={{ left: styles.left }} className="today-marker" />}
            </TodayMarker>
          </TimelineMarkers>
        </Timeline>
        <PopUp
          className="calendar-popup"
          open={this.state.isOpenPopup}
          onClose={() => this.setState({ isOpenPopup: false })}
          onAgree={this.openNewAllocationModal}
          data={this.state.popupData}
        />
        <Control
          setZoom={this.setZoom}
        />
      </div>
    );
  }
}
TimelineCalendar.propTypes = {
  employees: PropTypes.arrayOf(PropTypes.object).isRequired,
  allocations: PropTypes.arrayOf(PropTypes.object).isRequired,
  openModal: PropTypes.func.isRequired,
  changeAllocations: PropTypes.func.isRequired,
  searchData: PropTypes.objectOf(PropTypes.array).isRequired,
  sortUp: PropTypes.bool.isRequired,
  minTime: PropTypes.number.isRequired,
  maxTime: PropTypes.number.isRequired,
};

export default TimelineCalendar;

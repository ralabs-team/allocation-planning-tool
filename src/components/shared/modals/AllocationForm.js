import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';

import _ from 'lodash';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';
import 'moment/locale/uk';
import 'react-day-picker/lib/style.css';

import Autocomplete from '../autocomplete/Autocomplete';

class AllocationForm extends Component {
  state = {
    projectId: null,
    tasks: [],
    taskId: null,
    notes: '',
    hoursPerDay: 8,
  }

  handleSelected = (type, id) => {
    let { tasks } = this.state;
    const value = _.find(this.props.projects, ['_id', id]);

    if (type === 'project') {
      tasks = value ? value.tasks : this.state.tasks;
    }

    this.setState({
      [type]: value,
      [`${type}Id`]: id,
      tasks,
    });
  }

  handleDayChange = (type, day) => {
    this.setState({ [`${type}Day`]: day });
  }

  handleInputChange = (event) => {
    this.setState({
      notes: event.target.value,
    });
  };

  handleChangeHours = (e) => {
    this.setState({
      hoursPerDay: e.target.value,
    });
  }

  createAllocation = () => {
    const { employee } = this.props.modalsData.data;
    const { _id: taskId, title: taskTitle } = this.state.task;
    const { _id: projectId, title: projectTitle } = this.state.project;
    const {
      startDay, finishDay, notes, hoursPerDay,
    } = this.state;

    const allocation = {
      _id: Math.random().toString(),
      userId: employee._id,
      taskId,
      taskTitle,
      projectId,
      projectTitle,
      notes,
      startTime: moment(startDay),
      endTime: moment(finishDay),
      hoursPerDay,
      createAt: new Date(),
      createBy: '1',
    };

    this.props.addAllocation(allocation);
    this.props.hideModal();
  }

  render() {
    const { projects, modalsData } = this.props;
    const { tasks, taskId, projectId } = this.state;
    const {
      firstName, lastName, position, avatar,
    } = modalsData.data.employee;
    const cardClasses = {
      root: 'user-card',
    };

    return (
      <div>
        <div className="modal-content">
          <div className="modal-content__allocation-info">
            <div className="field-wrapper">
              <CardHeader
                classes={cardClasses}
                avatar={
                  <Avatar src={avatar}>
                    {!avatar && `${firstName.slice(0, 1)}${lastName.slice(0, 1)}`}
                  </Avatar>
                }
                title={`${firstName} ${lastName}`}
                subheader={position}
              />
            </div>

            <div className="field-wrapper">
              <div>Project</div>

              <Autocomplete
                handleChange={this.handleSelected}
                items={projects}
                type="project"
                selectedValue={projectId}
              />
            </div>

            <div className="field-wrapper">
              <div>Task</div>

              <Autocomplete
                handleChange={this.handleSelected}
                items={tasks}
                type="task"
                selectedValue={taskId}
              />
            </div>

            <div className="field-wrapper">
              <div>Comment</div>

              <TextField
                id="note"
                label="Note"
                value={this.state.note}
                onChange={this.handleInputChange}
                fullWidth
                margin="normal"
              />
            </div>
          </div>

          <div className="modal-content__allocation-time">
            <div className="picker-wrapper">
              <h6 className="picker-label">From:</h6>

              <DayPickerInput
                formatDate={formatDate}
                parseDate={parseDate}
                format="DD.MM.YYYY"
                placeholder={`${formatDate(new Date(), 'L', 'uk')}`}
                onDayChange={day => this.handleDayChange('start', day)}
              />
            </div>

            <div className="picker-wrapper">
              <h6 className="picker-label">To:</h6>

              <DayPickerInput
                className="date-picker"
                formatDate={formatDate}
                parseDate={parseDate}
                format="DD.MM.YYYY"
                placeholder={`${formatDate(new Date(), 'L', 'uk')}`}
                onDayChange={day => this.handleDayChange('finish', day)}
              />
            </div>

            <div className="picker-wrapper">
              <h6 className="picker-label">Hrs/Day:</h6>

              <input
                id="hours"
                name="hours"
                type="number"
                onChange={this.handleChangeHours}
                size="2"
                min="0"
                max="12"
                step="0.5"
                defaultValue={this.state.hoursPerDay}
              />
            </div>
          </div>
        </div>

        <div className="modal-action-block">
          <div className="button-wrapper">
            <Button
              className="create-button"
              onClick={this.createAllocation}
            >
              Create
            </Button>
          </div>

          <div className="button-wrapper">
            <Button
              className="cancel-button"
              onClick={this.props.hideModal}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default AllocationForm;

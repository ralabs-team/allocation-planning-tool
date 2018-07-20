import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import FormHelperText from '@material-ui/core/FormHelperText';

import _ from 'lodash';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';
import 'moment/locale/uk';
import 'react-day-picker/lib/style.css';

import Autocomplete from '../autocomplete/Autocomplete';

class AllocationForm extends Component {
  static propTypes = {
    projects: PropTypes.array.isRequired, // eslint-disable-line
    modalsData: PropTypes.object.isRequired, // eslint-disable-line
    addAllocation: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    const defaultProject = this.props.projects[0];
    const { time } = this.props.modalsData.data;

    this.state = {
      projects: this.props.projects,
      projectId: this.props.projects[0]._id,
      project: defaultProject,
      tasks: defaultProject.tasks,
      task: null,
      taskId: null,
      notes: '',
      startTime: new Date(time),
      endTime: new Date(time),
      hoursPerDay: 8,
    };
  }

  handleSelected = (type, id) => {
    let { tasks } = this.state;
    const value = _.find(this.state[`${type}s`], ['_id', id]);

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
    const invalidDate = (type === 'start' && day > this.state.endTime) || (type === 'end' && day < this.state.startTime);

    this.setState({
      [`${type}Time`]: day,
      invalidDate,
    });
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
    const { _id: taskId, title: taskTitle } = this.state.task || {};
    const { _id: projectId, title: projectTitle } = this.state.project;
    const {
      startTime, endTime, notes, hoursPerDay,
    } = this.state;

    const allocation = {
      _id: Math.random().toString(),
      userId: employee._id,
      taskId: taskId || '',
      taskTitle: taskTitle || '',
      projectId,
      projectTitle,
      notes,
      startTime: moment(startTime).hour(0),
      endTime: moment(endTime).hours(23).minute(59),
      hoursPerDay,
      createAt: new Date(),
      createBy: '1',
    };

    this.props.addAllocation(allocation);
    this.props.hideModal();
  }

  renderValidateText = () => {
    if (this.state.invalidDate) {
      return (
        <FormHelperText
          classes={{ root: 'picker-helper-text' }}
        >
          The second date must be greater than the first one
        </FormHelperText>
      );
    }

    return null;
  };

  render() {
    const { modalsData } = this.props;
    const {
      projects, tasks, taskId, projectId, startTime, endTime, note, hoursPerDay, invalidDate,
    } = this.state;
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
              <Autocomplete
                handleChange={this.handleSelected}
                items={projects}
                type="project"
                selectedValue={projectId}
                valueProperty="_id"
                labelProperty="title"
                inputLabel="Project"
                required
              />
            </div>

            <div className="field-wrapper">
              <Autocomplete
                handleChange={this.handleSelected}
                items={tasks}
                type="task"
                selectedValue={taskId}
                valueProperty="_id"
                labelProperty="title"
                inputLabel="Task"
              />
            </div>

            <div className="field-wrapper">
              <div>Comment</div>

              <TextField
                id="note"
                label="Note"
                value={note}
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
                placeholder={`${formatDate(new Date(startTime), 'L', 'uk')}`}
                onDayChange={day => this.handleDayChange('start', day)}
              />
            </div>

            <div className="picker-wrapper">
              <h6 className="picker-label">To:</h6>

              <DayPickerInput
                formatDate={formatDate}
                parseDate={parseDate}
                format="DD.MM.YYYY"
                placeholder={`${formatDate(new Date(endTime), 'L', 'uk')}`}
                onDayChange={day => this.handleDayChange('end', day)}
              />

              {this.renderValidateText()}
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
                defaultValue={hoursPerDay}
              />
            </div>
          </div>
        </div>

        <div className="modal-action-block">
          <div className="button-wrapper">
            <Button
              className="create-button"
              onClick={this.createAllocation}
              disabled={!projectId || invalidDate}
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

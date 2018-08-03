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
    allocations: PropTypes.array.isRequired, // eslint-disable-line
    addAllocation: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
    changeAllocations: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    const { allocation, initialTime, employee } = this.props.modalsData.data;
    const defaultProject = allocation ? _.find(this.props.projects, ['_id', allocation.projectId]) : this.props.projects[0];
    const defaultAllocation = allocation || {
      _id: Math.random().toString(), // will delete
      userId: employee._id,
      projectId: defaultProject._id,
      projectTitle: defaultProject.title,
      taskId: null,
      taskTitle: '',
      startTime: moment(initialTime).hour(0).toDate(),
      endTime: moment(initialTime).hours(23).minute(59).toDate(),
      hoursPerDay: '8',
      notes: '',
      createAt: new Date(),
      createBy: '1',
    };

    this.state = {
      projects: this.props.projects,
      tasks: defaultProject.tasks,
      allocation: defaultAllocation,
      invalidDate: false,
    };
  }

  onAutocompleteSelect = (id, type) => {
    const value = _.find(this.state[`${type}s`], ['_id', id]);
    const title = value ? value.title : null;

    if (type === 'project') {
      const tasks = value ? value.tasks : this.state.tasks;

      this.setState({
        tasks,
        allocation: {
          ...this.state.allocation,
          projectId: id,
          projectTitle: title,
          taskId: null,
          taskTitle: '',
        },
      });
    } else {
      this.setState({
        allocation: {
          ...this.state.allocation,
          [`${type}Id`]: id,
          [`${type}Title`]: title,
        },
      });
    }
  }

  handleDayChange = (type, day) => {
    const { allocation } = this.state;
    const invalidDate = (type === 'start' && day > allocation.endTime) || (type === 'end' && day < allocation.startTime);
    const date = type === 'start' ? moment(day).hour(0).toDate() : moment(day).hours(23).minute(59).toDate();

    this.setState({
      invalidDate,
      allocation: {
        ...allocation,
        [`${type}Time`]: date,
      },
    });
  }

  handleNoteInputChange = (event) => {
    this.setState({
      allocation: {
        ...this.state.allocation,
        notes: event.target.value,
      },
    });
  };

  handleChangeHours = (e) => {
    this.setState({
      allocation: {
        ...this.state.allocation,
        hoursPerDay: e.target.value,
      },
    });
  }

  handleAllocation = () => {
    const { allocation } = this.state;

    if (this.props.modalsData.mode === 'create') {
      const newAllocation = {
        ...allocation,
        createAt: new Date(),
        createBy: '1',
      };

      this.props.addAllocation(newAllocation);
    } else {
      const updatedAllocation = {
        ...allocation,
        updateAt: new Date(),
        updateBy: '1',
      };

      const allocations = this.props.allocations.map((item) => {
        if (item._id === allocation._id) return updatedAllocation;

        return item;
      });

      this.props.changeAllocations(allocations);
    }
    this.props.hideModal();
  }

  deleteAllocation = () => {
    const allocations = _.reject(this.props.allocations, { _id: this.state.allocation._id });

    this.props.changeAllocations(allocations);
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
    const { allocation, invalidDate } = this.state;
    const projects = this.props.projects.map(item => ({
      value: item._id,
      label: item.title,
      type: 'projects',
    }));
    const tasks = this.state.tasks.map(item => ({
      value: item._id,
      label: item.title,
      type: 'tasks',
    }));
    const {
      firstName, lastName, position, avatar,
    } = modalsData.data.employee;
    const cardClasses = {
      root: 'user-card',
    };

    return (
      <div>
        <div className="modal-content allocation">
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
                value={allocation.projectId}
                options={projects}
                onChange={this.onAutocompleteSelect}
                label="Project"
                type="project"
                placeholder="Search a project"
                required
              />
            </div>

            <div className="field-wrapper">
              <Autocomplete
                value={allocation.taskId}
                options={tasks}
                onChange={this.onAutocompleteSelect}
                label="Task"
                type="task"
                placeholder="Search a task"
              />
            </div>

            <div className="field-wrapper">
              <div>Comment</div>

              <TextField
                id="notes"
                label="Notes"
                value={allocation.notes}
                onChange={this.handleNoteInputChange}
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
                placeholder={`${formatDate(new Date(allocation.startTime), 'L', 'uk')}`}
                onDayChange={day => this.handleDayChange('start', day)}
              />
            </div>

            <div className="picker-wrapper">
              <h6 className="picker-label">To:</h6>

              <DayPickerInput
                formatDate={formatDate}
                parseDate={parseDate}
                format="DD.MM.YYYY"
                placeholder={`${formatDate(new Date(allocation.endTime), 'L', 'uk')}`}
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
                defaultValue={allocation.hoursPerDay}
              />
            </div>
          </div>
        </div>

        <div className="modal-action-block">
          <div className="button-wrapper">
            <Button
              className="create-button"
              onClick={this.handleAllocation}
              disabled={!allocation.projectId || invalidDate}
            >
              {modalsData.mode === 'create' ? 'Create' : 'Edit'}
            </Button>
          </div>

          {
            modalsData.mode === 'edit' &&
            <div className="button-wrapper">
              <Button
                className="delete-button"
                onClick={this.deleteAllocation}
              >
                Delete
              </Button>
            </div>
          }

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

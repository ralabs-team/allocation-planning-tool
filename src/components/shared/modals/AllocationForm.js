import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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

  handleInputChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  createAllocation = () => {
    const { employee } = this.props.modalsData.data;
    const { _id: taskId, title: taskTitle } = this.state.task;
    const { _id: projectId, title: projectTitle } = this.state.project;
    const { startDay, finishDay, notes } = this.state;

    const allocation = {
      _id: Math.random().toString(),
      userId: employee._id,
      taskId,
      taskTitle,
      projectId,
      projectTitle,
      startTime: moment(startDay),
      endTime: moment(finishDay),
      notes,
      createAt: new Date(),
      createBy: '1',
    };

    this.props.addAllocation(allocation);
    this.props.hideModal();
  }

  render() {
    const { projects } = this.props;
    const { tasks, taskId, projectId } = this.state;

    return (
      <div className="modal-content">
        <div>
          <div>Project</div>

          <Autocomplete
            handleChange={this.handleSelected}
            items={projects}
            type="project"
            selectedValue={projectId}
          />
        </div>

        <div>
          <div>Task</div>

          <Autocomplete
            handleChange={this.handleSelected}
            items={tasks}
            type="task"
            selectedValue={taskId}
          />
        </div>

        <div>
          <div>Comment</div>

          <TextField
            id="note"
            label="Note"
            value={this.state.note}
            onChange={this.handleInputChange('notes')}
            fullWidth
            margin="normal"
          />
        </div>

        <div>
          <div>from</div>

          <DayPickerInput
            formatDate={formatDate}
            parseDate={parseDate}
            format="DD.MM.YYYY"
            placeholder={`${formatDate(new Date(), 'L', 'uk')}`}
            onDayChange={day => this.handleDayChange('start', day)}
          />

          <div>To</div>

          <DayPickerInput
            formatDate={formatDate}
            parseDate={parseDate}
            format="DD.MM.YYYY"
            placeholder={`${formatDate(new Date(), 'L', 'uk')}`}
            onDayChange={day => this.handleDayChange('finish', day)}
          />
        </div>

        <div>
          <Button
            variant="contained"
            onClick={this.createAllocation}
          >
            Create
          </Button>

          <Button
            variant="contained"
            onClick={this.props.hideModal}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }
}

export default AllocationForm;

import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import _ from 'lodash';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';
import 'moment/locale/uk';
import 'react-day-picker/lib/style.css';

import Autocomplete from '../autocomplete/Autocomplete';

class TaskForm extends Component {
  state = {
    projectId: null,
    tasks: [],
    taskId: null,
  }

  handleSelected = (type, value) => {
    let { tasks } = this.state;

    if (type === 'project') {
      const project = _.find(this.props.projects, ['_id', value]);

      tasks = project ? project.tasks : this.state.tasks;
    }

    this.setState({
      [`${type}Id`]: value,
      tasks,
    });
  }

  handleDayChange = (type, day) => {
    this.setState({ [`${type}SelectedDay`]: day });
  }

  handleInputChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

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
            onChange={this.handleInputChange('note')}
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
      </div>
    );
  }
}

export default TaskForm;

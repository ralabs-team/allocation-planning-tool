import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';
import 'moment/locale/uk';
import 'react-day-picker/lib/style.css';

class TaskForm extends Component {
  state = {
    selectedProject: '',
    tasks: [],
    selectedTask: '',
  }

  handleTypes(type, value) {
    this.setState({ [`selected${type}`]: value });
  }

  handleSelect(type, value, item) {
    const tasks = item.tasks || this.state.tasks;

    this.setState({
      [`selected${type}`]: value,
      tasks,
    });
  }

  handleDayChange = (type, day) => {
    this.setState({ [`${type}SelectedDay`]: day });
  }

  render() {
    const { projects } = this.props;

    return (
      <div className="modal-content">
        <div>
          <div>Project</div>

          <Autocomplete
            getItemValue={item => item.title}
            shouldItemRender={(item, value) => item.title.toLowerCase().indexOf(value.toLowerCase()) > -1}
            items={projects}
            renderItem={item => (<div key={item._id}>{item.title}</div>)}
            value={this.state.selectedProject}
            onChange={e => this.handleTypes('Project', e.target.value)}
            onSelect={(val, item) => this.handleSelect('Project', val, item)}
          />
        </div>

        <div>
          <div>Task</div>

          <Autocomplete
            getItemValue={item => item.title}
            shouldItemRender={(item, value) => item.title.toLowerCase().indexOf(value.toLowerCase()) > -1}
            items={this.state.tasks}
            renderItem={item => (<div key={item._id}>{item.title}</div>)}
            value={this.state.selectedTask}
            onChange={e => this.handleTypes('Task', e.target.value)}
            onSelect={(val, item) => this.handleSelect('Task', val, item)}
          />
        </div>

        <div>
          <div>Comment</div>

          <input
            id="notes"
            type="text"
            ref={(input) => { this.notes = input; }}
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

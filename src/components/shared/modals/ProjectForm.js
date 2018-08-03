import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

class ProjectForm extends Component {
  static propTypes = {
    modalsData: PropTypes.object.isRequired, // eslint-disable-line
    employees: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  state = {
    teamOpen: false,
    tasksOpen: false,
  }

  toggleCollapse = (type) => {
    this.setState({ [`${type}Open`]: !this.state[`${type}Open`] });
  }

  renderTeam() {
    const { modalsData, employees } = this.props;

    return employees.map((item) => {
      if (modalsData.data.project.team.includes(item._id)) {
        return (
          <ListItem
            key={item._id}
            button
          >
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText inset primary={`${item.firstName} ${item.lastName}`} />
          </ListItem>
        );
      }

      return null;
    });
  }

  renderTasks() {
    return this.props.modalsData.data.project.tasks.map(item => (
      <ListItem
        key={item._id}
        button
      >
        <ListItemIcon>
          <StarBorder />
        </ListItemIcon>
        <ListItemText inset primary={item.title} />
      </ListItem>
    ));
  }

  render() {
    const { title, status } = this.props.modalsData.data.project;

    return (
      <div className="modal-content">
        <div>
          <h4>Projedt</h4>

          <List component="nav">
            <ListItem button>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={title} />
            </ListItem>

            <Divider />

            <ListItem button>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary={status} />
            </ListItem>
          </List>

          <Divider />

          <ListItem button onClick={() => this.toggleCollapse('team')}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText inset primary="Team" />
            {this.state.teamOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse
            in={this.state.teamOpen}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              {this.renderTeam()}
            </List>
          </Collapse>

          <Divider />

          <ListItem button onClick={() => this.toggleCollapse('tasks')}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText inset primary="Tasks" />
            {this.state.tasksOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse
            in={this.state.tasksOpen}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              {this.renderTasks()}
            </List>
          </Collapse>
        </div>
      </div>
    );
  }
}

export default ProjectForm;

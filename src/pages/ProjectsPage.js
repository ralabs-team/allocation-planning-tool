import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
// material-ui
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

// actions
import { getProjects, openModal } from '../actions';

class ProjectsPage extends Component {
  static propTypes = {
    getProjects: PropTypes.func.isRequired,
    projects: PropTypes.arrayOf(PropTypes.object).isRequired,
    searchData: PropTypes.objectOf(PropTypes.array).isRequired,
    sortUp: PropTypes.bool.isRequired,
    openModal: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getProjects();
  }

  onItemClick(id) {
    const modalData = {
      type: 'PROJECT',
      mode: 'edit',
      data: {
        project: _.find(this.props.projects, ['_id', id]),
      },
    };

    this.props.openModal(modalData);
  }

  renderProjectsList() {
    const { projects, sortUp, searchData } = this.props;
    const sortedProjects = sortUp ? projects : _.clone(projects).reverse();
    const filteredProjects = !searchData.projectsIds ?
      sortedProjects : sortedProjects.filter(item => searchData.projectsIds.includes(item._id));

    return filteredProjects.map((project) => {
      const { _id, title, status } = project;

      return (
        [
          <ListItem
            key={_id}
            classes={{ root: 'list-item' }}
            onClick={() => this.onItemClick(_id)}
          >
            <ListItemText
              primary={title}
              secondary={status}
            />
          </ListItem>,
          <Divider key="devider" />,
        ]
      );
    });
  }

  render() {
    return (
      <div className="list">
        <List>
          {this.props.projects.length && this.renderProjectsList()}
        </List>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  projects: state.projects.allProjects,
  searchData: state.search.searchData,
  sortUp: state.search.sortUp,
});

const mapDispatchToProps = dispatch => ({
  getProjects: () => { dispatch(getProjects()); },
  openModal: bindActionCreators(openModal, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsPage);

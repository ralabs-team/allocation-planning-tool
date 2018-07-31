import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LineStyleIcon from '@material-ui/icons/LineStyle';


import SearchPanel from './SearchPanel';
import { setSearch, reverseSort } from '../../../actions';

import './header.css';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  icon: {
    marginRight: theme.spacing.unit,
    fontSize: 32,
  },
  logoText: {
    fontSize: 20,
  },
});

const Header = (props) => {
  const { classes } = props;
  return (
    <div className="header">
      <div className="header-bar">
        <div className={classes.root}>
          <AppBar position="static" color="primary">
            <Toolbar>
              <Typography variant="title" color="inherit" className={classes.flex} >
                <Button color="inherit" component={Link} to="/" disableRipple>
                  <LineStyleIcon color="inherit" className={classes.icon} />
                  <span className={classes.logoText}>Allocation Planning Tool</span>
                </Button>
              </Typography>
              <Button color="inherit" component={Link} to="/dashboard">
                Schedule
              </Button>
              <Button color="inherit" component={Link} to="/projects">
                Projects
              </Button>
              <Button color="inherit" component={Link} to="/employees">
                People
              </Button>
              <Button color="inherit">
                My profile
              </Button>
            </Toolbar>
          </AppBar>
        </div>
      </div>
      <SearchPanel {...props} />
    </div>);
};

Header.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line
};

const mapStateToProps = state => ({
  projects: state.projects.allProjects,
  employees: state.users.allUsers,
  searchData: state.search.searchData,
});

const mapDispatchToProps = dispatch => ({
  setSearch: bindActionCreators(setSearch, dispatch),
  reverseSort: () => { dispatch(reverseSort()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header));

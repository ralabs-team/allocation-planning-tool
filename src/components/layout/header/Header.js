import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// material ui
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// icons
import LineStyleIcon from '@material-ui/icons/LineStyle';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DraftsIcon from '@material-ui/icons/ExitToApp';
import PeopleIcon from '@material-ui/icons/People';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AssignmentIcon from '@material-ui/icons/Assignment';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';

import SearchPanel from './SearchPanel';
import { setSearch, reverseSort, logOut } from '../../../actions';

import './header.css';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menu: {
    marginTop: 48,
    marginLeft: 10,
  },
  logoIcon: {
    marginRight: theme.spacing.unit,
    fontSize: 32,
  },
  logoText: {
    fontSize: 20,
  },
  buttonIcon: {
    marginRight: 5,
  },
  buttonsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

class Header extends React.Component {
  state = {
    anchorEl: null,
  }
  renderLoggedInButtons() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const profileSubMenuOpen = !!anchorEl;
    return (
      <div className={classes.buttonsContainer}>
        <Button color="inherit" component={Link} to="/dashboard">
          <AssignmentIcon className={classes.buttonIcon} />
          Schedule
        </Button>
        <Button color="inherit" component={Link} to="/projects">
          <BusinessCenterIcon className={classes.buttonIcon} />
          Projects
        </Button>
        <Button color="inherit" component={Link} to="/employees">
          <PeopleIcon className={classes.buttonIcon} />
          People
        </Button>
        <div>
          <Button
            color="inherit"
            aria-owns={profileSubMenuOpen ? 'menu-appbar' : null}
            onClick={event => this.setState({ anchorEl: event.currentTarget })}
            aria-haspopup
          >
            <AccountBoxIcon className={classes.buttonIcon} />
            My profile
          </Button>
          <Menu
            id="menu-appbar"
            className={classes.menu}
            anchorEl={anchorEl}
            open={profileSubMenuOpen}
            onClick={() => this.setState({ anchorEl: null })}
          >
            <MenuItem component={Link} to="/settings">
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText>Settings</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => this.props.logOut()} component={Link} to="/">
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText>Log out</ListItemText>
            </MenuItem>
          </Menu>
        </div>
      </div>
    );
  }
  renderNotLoggedInButtons() {
    const { classes } = this.props;
    return (
      <div className={classes.buttonsContainer}>
        <Button color="inherit">
          <PersonIcon className={classes.buttonIcon} />
          Log In
        </Button>
        <Button color="inherit">
          <PersonAddIcon className={classes.buttonIcon} />
          Sign Up
        </Button>
      </div>
    );
  }
  render() {
    const { classes, renderSearch, loggedIn } = this.props;
    return (
      <div className="header">
        <div className="header-bar">
          <div className={classes.root}>
            <AppBar position="static" color="primary">
              <Toolbar>
                <Typography variant="title" color="inherit" className={classes.flex} >
                  <Button color="inherit" component={Link} to="/" disableRipple>
                    <LineStyleIcon color="inherit" className={classes.logoIcon} />
                    <span className={classes.logoText}>Allocation Planning Tool</span>
                  </Button>
                </Typography>
                {loggedIn ? this.renderLoggedInButtons() : this.renderNotLoggedInButtons()}
              </Toolbar>
            </AppBar>
          </div>
        </div>
        {renderSearch && loggedIn &&
          <SearchPanel {...this.props} />
        }
      </div>);
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line
  renderSearch: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  logOut: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  projects: state.projects.allProjects,
  employees: state.users.allUsers,
  searchData: state.search.searchData,
  loggedIn: state.auth.loggedIn,
});

const mapDispatchToProps = dispatch => ({
  setSearch: bindActionCreators(setSearch, dispatch),
  reverseSort: () => dispatch(reverseSort()),
  logOut: () => dispatch(logOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header));

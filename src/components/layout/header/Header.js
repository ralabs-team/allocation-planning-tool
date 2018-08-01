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
import DraftsIcon from '@material-ui/icons/ExitToApp';

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
  menu: {
    marginTop: 48,
    marginLeft: 10,
  },
  icon: {
    marginRight: theme.spacing.unit,
    fontSize: 32,
  },
  logoText: {
    fontSize: 20,
  },
});

class Header extends React.Component {
  state = {
    anchorEl: null,
  }
  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const profileSubMenuOpen = !!anchorEl;
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
                <div>
                  <Button
                    color="inherit"
                    aria-owns={profileSubMenuOpen ? 'menu-appbar' : null}
                    onClick={event => this.setState({ anchorEl: event.currentTarget })}
                    aria-haspopup
                  >
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
                    <MenuItem>
                      <ListItemIcon>
                        <DraftsIcon />
                      </ListItemIcon>
                      <ListItemText>Log out</ListItemText>
                    </MenuItem>
                  </Menu>
                </div>
              </Toolbar>
            </AppBar>
          </div>
        </div>
        <SearchPanel {...this.props} />
      </div>);
  }
}

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

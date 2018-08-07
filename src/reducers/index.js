import { combineReducers } from 'redux';

// reducers
import allocations from './allocations';
import modals from './modals';
import projects from './projects';
import search from './search';
import users from './users';
import auth from './auth';
import calendar from './calendar';

const rootReducer = combineReducers({
  allocations,
  modals,
  projects,
  search,
  users,
  auth,
  calendar,
});

export default rootReducer;

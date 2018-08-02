import { combineReducers } from 'redux';

// reducers
import allocations from './allocations';
import modals from './modals';
import projects from './projects';
import search from './search';
import users from './users';
import auth from './auth';

const appReducer = combineReducers({
  allocations,
  modals,
  projects,
  search,
  users,
  auth,
});
const rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;

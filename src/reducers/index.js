import { combineReducers } from 'redux';

// reducers
import allocations from './allocations';
import modals from './modals';
import projects from './projects';
import search from './search';
import users from './users';

const appReducer = combineReducers({
  allocations,
  modals,
  projects,
  search,
  users,
});
const rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;

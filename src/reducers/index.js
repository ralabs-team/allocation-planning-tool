import { combineReducers } from 'redux';

// reducers
import modals from './modals';
import projects from './projects';
import allocations from './allocations';
import users from './users';

const appReducer = combineReducers({
  modals,
  projects,
  allocations,
  users,
});
const rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;

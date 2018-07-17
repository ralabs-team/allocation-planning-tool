import { combineReducers } from 'redux';

// reducers
import modals from './modals';
import schedulers from './schedulers';
import users from './users';

const appReducer = combineReducers({
  modals,
  schedulers,
  users,
});
const rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;

import { combineReducers } from 'redux';

// reducers
import schedulers from './schedulers';
import users from './users';

const appReducer = combineReducers({
  schedulers,
  users,
});
const rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;

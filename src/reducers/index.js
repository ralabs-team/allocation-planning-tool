import { combineReducers } from 'redux';

const appReducer = combineReducers({});
const rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;

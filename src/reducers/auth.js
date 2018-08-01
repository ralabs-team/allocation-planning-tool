import { LOG_OUT } from '../actions';

const initialState = {
  loggedIn: true,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case LOG_OUT:
      return { ...state, loggedIn: false };
    default:
      return state;
  }
}

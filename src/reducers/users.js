import { GET_USERS } from '../actions';

const initialState = {
  allUsers: [],
};

export default function users(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };
    default:
      return state;
  }
}

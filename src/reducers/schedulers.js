import { GET_SCHEDULERS, ADD_ALLOCATION, CHANGE_ALLOCATION } from '../actions';

const initialState = {
  allSchedulers: [],
};

export default function schedulers(state = initialState, action) {
  switch (action.type) {
    case GET_SCHEDULERS:
      return {
        allSchedulers: action.payload,
      };
    case ADD_ALLOCATION:
      return {
        allSchedulers: [...state.allSchedulers, action.payload],
      };
    case CHANGE_ALLOCATION:
      return {
        allSchedulers: action.payload,
      };
    default:
      return state;
  }
}

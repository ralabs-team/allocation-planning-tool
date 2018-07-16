import { GET_SCHEDULERS } from '../actions';

const initialState = {
  allSchedulers: [],
};

export default function schedulers(state = initialState, action) {
  switch (action.type) {
    case GET_SCHEDULERS:
      return {
        allSchedulers: action.payload,
      };
    default:
      return state;
  }
}

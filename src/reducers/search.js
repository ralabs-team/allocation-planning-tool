import { SET_SEARCH } from '../actions';

const initialState = {
  searchData: {
    searchValues: null,
    employeesIds: null,
    projectsIds: null,
  },
};

export default function search(state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH:
      return {
        ...state,
        searchData: action.payload,
      };
    default:
      return state;
  }
}

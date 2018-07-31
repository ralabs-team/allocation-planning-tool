import { SET_SEARCH, REVERSE_SORT } from '../actions';

const initialState = {
  searchData: {
    searchValues: null,
    employeesIds: null,
    projectsIds: null,
  },
  sortUp: true,
};

export default function search(state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH:
      return {
        ...state,
        searchData: action.payload,
      };
    case REVERSE_SORT:
      return {
        ...state,
        sortUp: !state.sortUp,
      };
    default:
      return state;
  }
}

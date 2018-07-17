import { GET_PROJECTS } from '../actions';

const initialState = {
  allProjects: [],
};

export default function projects(state = initialState, action) {
  switch (action.type) {
    case GET_PROJECTS:
      return {
        ...state,
        allProjects: action.payload,
      };
    default:
      return state;
  }
}

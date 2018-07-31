import { GET_ALLOCATIONS, ADD_ALLOCATION, CHANGE_ALLOCATIONS } from '../actions';

const initialState = {
  allAllocations: [],
};

export default function allocations(state = initialState, action) {
  switch (action.type) {
    case GET_ALLOCATIONS:
      return {
        allAllocations: action.payload,
      };
    case ADD_ALLOCATION:
      return {
        allAllocations: [...state.allAllocations, action.payload],
      };
    case CHANGE_ALLOCATIONS:
      return {
        allAllocations: action.payload,
      };
    default:
      return state;
  }
}

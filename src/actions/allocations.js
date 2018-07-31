import allocations from '../mock/allocations';

const GET_ALLOCATIONS = 'GET_ALLOCATIONS';
const ADD_ALLOCATION = 'ADD_ALLOCATION';
const CHANGE_ALLOCATIONS = 'CHANGE_ALLOCATIONS';

const getAllocations = () => ({
  type: GET_ALLOCATIONS,
  payload: allocations,
});

const addAllocation = allocation => ({
  type: ADD_ALLOCATION,
  payload: allocation,
});

const changeAllocations = newAllocations => ({
  type: CHANGE_ALLOCATIONS,
  payload: newAllocations,
});

export {
  GET_ALLOCATIONS,
  getAllocations,
  ADD_ALLOCATION,
  addAllocation,
  CHANGE_ALLOCATIONS,
  changeAllocations,
};

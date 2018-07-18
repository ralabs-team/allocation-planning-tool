import scheduler from '../mock/scheduler';

const GET_SCHEDULERS = 'GET_SCHEDULERS';
const ADD_ALLOCATION = 'ADD_ALLOCATION';

const getSchedulers = () => ({
  type: GET_SCHEDULERS,
  payload: scheduler,
});

const addAllocation = allocation => ({
  type: ADD_ALLOCATION,
  payload: allocation,
});

export {
  GET_SCHEDULERS,
  ADD_ALLOCATION,
  getSchedulers,
  addAllocation,
};

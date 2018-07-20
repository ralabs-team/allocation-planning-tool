import scheduler from '../mock/scheduler';

const GET_SCHEDULERS = 'GET_SCHEDULERS';
const ADD_ALLOCATION = 'ADD_ALLOCATION';
const CHANGE_ALLOCATION = 'CHANGE_ALLOCATION';

const getSchedulers = () => ({
  type: GET_SCHEDULERS,
  payload: scheduler,
});

const addAllocation = allocation => ({
  type: ADD_ALLOCATION,
  payload: allocation,
});

const changeAllocation = newScheduler => ({
  type: CHANGE_ALLOCATION,
  payload: newScheduler,
});

export {
  GET_SCHEDULERS,
  getSchedulers,
  ADD_ALLOCATION,
  addAllocation,
  CHANGE_ALLOCATION,
  changeAllocation,
};

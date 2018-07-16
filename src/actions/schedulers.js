import scheduler from '../mock/scheduler';

export const GET_SCHEDULERS = 'GET_SCHEDULERS';

export const getSchedulers = () => ({
  type: GET_SCHEDULERS,
  payload: scheduler,
});

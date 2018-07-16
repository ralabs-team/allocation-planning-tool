import users from '../mock/users.json';

export const GET_USERS = 'GET_USERS';

export const getUsers = () => ({
  type: GET_USERS,
  payload: users,
});

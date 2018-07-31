import users from '../mock/users.json';

export const GET_USERS = 'GET_USERS';

export const getUsers = () => ({
  type: GET_USERS,
  payload: users.sort((x, y) => (x.lastName > y.lastName ? 1 : -1)),
});

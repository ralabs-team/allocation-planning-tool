import projects from '../mock/projects.json';

export const GET_PROJECTS = 'GET_PROJECTS';

export const getProjects = () => ({
  type: GET_PROJECTS,
  payload: projects,
});

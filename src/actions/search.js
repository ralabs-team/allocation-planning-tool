export const SET_SEARCH = 'SET_SEARCH';
export const REVERSE_SORT = 'REVERSE_SORT';

export const setSearch = search => ({
  type: SET_SEARCH,
  payload: search,
});

export const reverseSort = () => ({
  type: REVERSE_SORT,
});

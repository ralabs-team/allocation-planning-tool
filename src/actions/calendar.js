export const SET_CURRENT_MONTH = 'calendar.SET_CURRENT_MONTH';
export const SET_PREV_MONTH = 'calendar.SET_PREV_MONTH';
export const SET_NEXT_MONTH = 'calendar.SET_NEXT_MONTH';

export const setCurrentMonth = () => ({
  type: SET_CURRENT_MONTH,
});

export const setPrevMonth = () => ({
  type: SET_PREV_MONTH,
});

export const setNextMonth = () => ({
  type: SET_NEXT_MONTH,
});

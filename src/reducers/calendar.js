import moment from 'moment';
import { SET_CURRENT_MONTH, SET_PREV_MONTH, SET_NEXT_MONTH } from '../actions';

const initialState = {
  visibleMonth: moment().startOf('M').valueOf(),
};

export default function calendar(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_MONTH:
      return {
        ...state,
        visibleMonth: initialState.visibleMonth,
      };
    case SET_PREV_MONTH:
      return {
        ...state,
        visibleMonth: moment(state.visibleMonth).add(-1, 'M').valueOf(),
      };
    case SET_NEXT_MONTH:
      return {
        ...state,
        visibleMonth: moment(state.visibleMonth).add(1, 'M').valueOf(),
      };
    default:
      return state;
  }
}

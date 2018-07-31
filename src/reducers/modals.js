import { OPEN_MODAL, HIDE_MODAL } from '../actions';

const initialState = {
  isOpen: false,
  type: null,
  mode: null,
  data: null,
};

export default function modals(state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        isOpen: true,
        type: action.payload.type,
        mode: action.payload.mode,
        data: action.payload.data,
      };
    case HIDE_MODAL:
      return {
        ...state,
        isOpen: false,
        type: null,
        data: null,
      };
    default:
      return state;
  }
}

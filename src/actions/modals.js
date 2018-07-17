export const OPEN_MODAL = 'OPEN_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';

export const openModal = modalData => ({
  type: OPEN_MODAL,
  payload: modalData,
});

export const hideModal = () => ({
  type: HIDE_MODAL,
});

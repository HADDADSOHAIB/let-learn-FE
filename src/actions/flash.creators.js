import { SET_FLASH, CLEAR_FLASH } from './flash.types';

const setFlash = flash => ({
  type: SET_FLASH,
  payload: {
    flash,
  },
});

const clearFlash = () => ({
  type: CLEAR_FLASH,
});

export {
  setFlash,
  clearFlash,
};

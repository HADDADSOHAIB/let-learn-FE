import {
  SET_FLASH,
  CLEAR_FLASH,
} from '../actions/flash.types';

const INITIAL_STATE = {
  severity: '',
  message: '',
  open: false,
};

const flashReducer = (state = INITIAL_STATE, action) => {
  const { payload } = action;

  switch (action.type) {
    case CLEAR_FLASH:
      return {
        ...state,
        severity: '',
        message: '',
        open: false,
      };
    case SET_FLASH:
      return {
        ...state,
        severity: payload.flash.severity,
        message: payload.flash.message,
        open: payload.flash.open,
      };
    default:
      return {
        ...state,
      };
  }
};

export default flashReducer;

import {
  START_FETCHING_SHOWS,
} from '../actions/users.types';

const INITIAL_STATE = {
  
};

const usersReducer = (state = INITIAL_STATE, action) => {
  const { payload } = action;

  switch (action.type) {
    case START_FETCHING_SHOWS:
      return {
        ...state,
        dataLoading: true,
      };
    default:
      return {
        ...state,
      };
  }
};

export default usersReducer;


import { combineReducers } from 'redux';
import flashReducer from './flash.reducer';

const rootReducer = combineReducers({
  flash: flashReducer,
});

export default rootReducer;

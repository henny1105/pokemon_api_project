import { combineReducers } from '@reduxjs/toolkit';
import myInfoSlice from './reducers/Slice';

const rootReducer = combineReducers({
  myInfo: myInfoSlice,

});

export default rootReducer;

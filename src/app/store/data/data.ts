import { combineReducers } from '@reduxjs/toolkit';
import ids from './Ids';
import items from './items';
import { apiSlice } from '../../api/apiSlice';
import queryStatus from './queryStatus';

const rootReducer = combineReducers({
  ids: ids,
  items: items,
  queryStatus: queryStatus,
  dataApi: apiSlice.reducer
});

export default rootReducer;
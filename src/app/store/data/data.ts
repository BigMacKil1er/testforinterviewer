import { combineReducers } from '@reduxjs/toolkit';
import ids from './Ids';
import items from './items';
import { apiSlice } from '../../api/apiSlice';

const rootReducer = combineReducers({
  ids: ids,
  items: items,
  dataApi: apiSlice.reducer
});

export default rootReducer;
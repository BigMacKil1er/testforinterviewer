import { combineReducers } from '@reduxjs/toolkit';
import ids from './Ids';
import items from './items';

const rootReducer = combineReducers({
  ids: ids,
  items: items
});

export default rootReducer;
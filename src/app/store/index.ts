import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './data/data';
import { apiSlice } from '../api/apiSlice';


const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export default store;
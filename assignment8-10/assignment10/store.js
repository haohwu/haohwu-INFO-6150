import { configureStore } from '@reduxjs/toolkit';
import userReducer from './assignment10/userSlice';
import jobReducer from './assignment10/jobSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    job: jobReducer,
  },
});

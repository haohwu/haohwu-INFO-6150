import { createSlice } from '@reduxjs/toolkit';

export const jobSlice = createSlice({
  name: 'job',
  initialState: {
      jobs: []
  },
  reducers: {
      setJobs: (state, action) => {
          state.jobs = action.payload;
      },
      addJob: (state, action) => {
          state.jobs.push(action.payload);
      }
  }
});

export const { setJobs } = jobSlice.actions;
export default jobSlice.reducer;


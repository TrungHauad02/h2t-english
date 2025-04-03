import { createSlice } from '@reduxjs/toolkit';

const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    showHeaderFooter: true,
  },
  reducers: {
    showLayout: (state) => {
      state.showHeaderFooter = true;
    },
    hideLayout: (state) => {
      state.showHeaderFooter = false;
    },
  },
});

export const { showLayout, hideLayout } = layoutSlice.actions;
export default layoutSlice.reducer;

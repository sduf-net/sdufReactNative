import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  drawers: {},
};

export const drawer = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    registerDrawerById: (state, value) => {
      state.drawers[value.payload] = 0;
    },
    showDrawerById: (state, value) => {
      state.drawers[value.payload] = state.drawers[value.payload] + 1;
    },
    hideDrawerById: (state, value) => {
      state.drawers[value.payload] = -1;
    },
  },
});

// Action creators are generated for each case reducer function
export const { registerDrawerById, showDrawerById, hideDrawerById } = drawer.actions;
export default drawer.reducer;

// Export a reusable selector here
export const selectDrawerById = (state, id) => {
  if (!id) return null;
  return state.drawer.drawers[id] ?? null;
};

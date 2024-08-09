import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState = {
  markers: null,
};

export const currentMap = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setMarkers: (state, value) => {
      state.markers = value.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMarkers } = currentMap.actions;

export default currentMap.reducer;

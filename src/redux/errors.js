import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  errors: [],
};

export const errors = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    addError: (state, value) => {
      const newError = value.payload;
      state.errors.push(newError);
    },
    removeError: (state) => {
      state.errors.shift();
    },
    removeByIndex: (state, value) => {
      const index = value.payload;
      state.errors.splice(index, 1);
    },
    dismissErrors: (state) => {
      state.errors = [];
    },
  },
});

export const { addError, removeError, dismissErrors, removeByIndex } = errors.actions;

export default errors.reducer;

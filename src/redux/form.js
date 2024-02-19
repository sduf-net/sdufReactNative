import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: {},
  action: null,
  method: null,
  original_data: null
}

export const currentForm = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setForm: (state, value) => {
      state.data = { ...state.data, ...value.payload };
    },
    resetForm: (state) => {
      state.data = {};
    },
    setUpForm: (state, value) => {
      state.action = value.payload.action;
      state.method = value.payload.method;
      state.original_data = value.payload.original_data;
    }
  }
})

// Action creators are generated for each case reducer function
export const { setForm, setUpForm, resetForm } = currentForm.actions

export default currentForm.reducer
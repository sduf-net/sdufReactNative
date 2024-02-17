import { createSlice } from '@reduxjs/toolkit'
import _ from "lodash";

const initialState = {
  form: {},
  action: null,
  method: null
}

export const currentForm = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setForm: (state, value) => {
      state.form = {...state.form, ...value.payload};
    },
    resetForm: (state) => {
      state.form = {};
    },
    setUpForm: (state, value) => {
      state.action = value.payload.action;
      state.method = value.payload.method;
    }
  }
})

// Action creators are generated for each case reducer function
export const { setForm, setUpForm, resetForm } = currentForm.actions

export default currentForm.reducer
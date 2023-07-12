import { createSlice } from '@reduxjs/toolkit'
import _ from "lodash";

const initialState = {
  form: {}
}

export const currentForm = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setForm: (state, value) => {
      state.form = {...state.form, ...value.payload};
    }
  }
})

// Action creators are generated for each case reducer function
export const { setForm } = currentForm.actions

export default currentForm.reducer
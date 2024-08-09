import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  forms: [],
};

export const currentForm = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setForm: (state, value) => {
      const form_id = value.payload.form_id;
      delete value.payload.form_id;

      state.data = {
        ...state.data,
        [form_id]: { ...state.data[form_id], ...value.payload },
      };
    },
    resetForm: (state, value) => {
      const form_id = value.payload.form_id;
      delete value.payload.form_id;

      state.data = {
        ...state.data,
        [form_id]: {},
      };
    },
    setUpForm: (state, value) => {
      state.forms = {
        ...state.forms,
        [value.payload.form_id]: {
          action: value.payload.action,
          method: value.payload.method,
          original_data: value.payload.original_data,
        },
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setForm, setUpForm, resetForm } = currentForm.actions;

export default currentForm.reducer;

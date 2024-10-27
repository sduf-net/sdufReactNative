import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {},
  forms: {},
  formValidations: {},
  formErrors: {},
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
    setFormError: (state, value) => {
      const form_id = value.payload.form_id;
      delete value.payload.form_id;

      state.formErrors = {
        ...state.formErrors,
        [form_id]: { ...state.formErrors[form_id], ...value.payload },
      };
    },
    resetFormErrors: (state, value) => {
      const form_id = value.payload.form_id;

      state.formErrors = {
        [form_id]: {},
      };
    },
    setFormValidations: (state, value) => {
      const form_id = value.payload.form_id;
      delete value.payload.form_id;

      state.formValidations = {
        ...state.formValidations,
        [form_id]: { ...state.formValidations[form_id], ...value.payload },
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
export const { setForm, setUpForm, resetForm, setFormValidations, setFormError, resetFormErrors } =
  currentForm.actions;

export default currentForm.reducer;

export const selectFormValue = (state, formId, fieldName) => {
  const form = state.form.data;
  if (form && form[formId] && form[formId][fieldName] !== undefined) {
    return form[formId][fieldName];
  }
  return '';
};

export const selectFormValidations = (state, formId) => {
  const formValidation = state.form.formValidations;
  if (formValidation && formValidation[formId] !== undefined) {
    return formValidation[formId];
  }
  return [];
};

export const selectFieldErrors = (state, formId, fieldName) => {
  const formErrors = state.form.formErrors;
  if (formErrors && formErrors[formId] && formErrors[formId][fieldName] !== undefined) {
    return formErrors[formId][fieldName];
  }
  return null;
};

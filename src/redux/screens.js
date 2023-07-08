import { createSlice } from '@reduxjs/toolkit'
import _ from "lodash";

const initialState = {
  id: null,
  name: null,
  nestedComponents: [],
  loading: false
}

export const currentScreen = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    startLoading: (state, value) => {
      state.loading = true;
    },
    endLoading: (state, value) => {
      state.loading = false;
    },
    setCurrentScreen: (state, value) => {
      if (state.name != value.payload.name) {
        state.nestedComponents = value.payload.nestedComponents;
        state.id = value.payload.id;
        state.name = value.payload.name;
        state.loading = false;
      }
    },
    insertAfter: (state, value) => {
      let is_exist = state.nestedComponents.filter(widget => widget.id == value.payload.widget.id).length;

      if (value.payload.widget && !is_exist) {
        state.nestedComponents.push(value.payload.widget);
      }
    },
    remove: (state, value) => {
      state.nestedComponents = state.nestedComponents.filter((widget => widget.id != value.payload.parent_id));
    }
  },
})

// Action creators are generated for each case reducer function
export const { setCurrentScreen, insertAfter, remove, resetCurrentScreen } = currentScreen.actions

export default currentScreen.reducer
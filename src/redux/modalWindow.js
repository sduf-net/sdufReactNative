import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  nestedComponents: [],
  showModalWindow: false
}

export const modalWindow = createSlice({
  name: 'modalWindow',
  initialState,
  reducers: {
    showModalWindow: (state, value) => {
      state.showModalWindow = true;
    },
    hideModalWindow: (state, value) => {
      state.showModalWindow = false;
    },
    setModalWindowWidgets: (state, value) => {
      if (Array.isArray(value.payload.nestedComponents)) {
        state.nestedComponents = value.payload.nestedComponents;
      } else {
        let index = state.nestedComponents.findIndex(widget => widget.id === value.payload.nestedComponents.id);

        // if widget is already in place
        if (index !== -1) {
          return;
        }

        state.nestedComponents.push(value.payload.nestedComponents);
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const {
  showModalWindow,
  hideModalWindow,
  setModalWindowWidgets
} = modalWindow.actions

export default modalWindow.reducer
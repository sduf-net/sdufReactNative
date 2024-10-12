import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nestedComponents: [],
  showDarwer: 0,
};

export const drawer = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    showDrawer: (state, _value) => {
      state.showDarwer = state.showDarwer + 1;
    },
    hideDrawer: (state, _value) => {
      state.showDarwer = -1;
    },
    setDrawerWidgets: (state, value) => {
      if (Array.isArray(value.payload.nestedComponents)) {
        state.nestedComponents = value.payload.nestedComponents;
      } else {
        let index = state.nestedComponents.findIndex(
          (widget) => widget.id === value.payload.nestedComponents.id
        );

        // if widget is already in place
        if (index !== -1) {
          return;
        }

        state.nestedComponents.push(value.payload.nestedComponents);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { showDrawer, hideDrawer, setDrawerWidgets } = drawer.actions;
export default drawer.reducer;

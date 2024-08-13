import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nestedComponents: [],
  showDrawer: false,
};

export const drawer = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    showDrawer: (state, _) => {
      state.showDrawer = true;
    },
    hideDrawer: (state, _) => {
      state.showDrawer = false;
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
    resetDrawerWidgets: (state, value) => {
      state.nestedComponents = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { showDrawer, hideDrawer, setDrawerWidgets, resetDrawerWidgets } = drawer.actions;

export default drawer.reducer;

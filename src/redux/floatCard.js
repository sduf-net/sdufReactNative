import { createSlice } from '@reduxjs/toolkit'
import _ from "lodash";

const initialState = {
  nestedComponents: [],
  showFloatCard: false
}

export const floatCard = createSlice({
  name: 'floatCard',
  initialState,
  reducers: {
    showFloatCard: (state, value) => {
      state.showFloatCard = true;
    },
    hideFloatCard: (state, value) => {
      state.showFloatCard = false;
    },
    setFloatCardWidgets: (state, value) => {
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
  showFloatCard,
  hideFloatCard,
  setFloatCardWidgets
} = floatCard.actions

export default floatCard.reducer
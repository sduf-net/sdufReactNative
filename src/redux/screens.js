import { createSlice } from '@reduxjs/toolkit'
import _ from "lodash";

const initialState = {
  id: 1,
  name: "",
  nestedComponents: []
}

export const currentScreen = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setCurrentScreen: (state, value) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      if (state.name != value.payload.name) {
        console.log("UPDATE", state.name, value.payload.name)
        state.nestedComponents = value.payload.nestedComponents
        state.id = value.payload.id
        state.name = value.payload.name
      }
    },
    insertAfter: (state, value) => {

      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      let is_exist = state.nestedComponents.filter(widget => widget.id == value.payload.widget.id).length;

      if (value.payload.widget && !is_exist) {
        state.nestedComponents.push(value.payload.widget);
      }
    },
    remove: (state, value) => {
      state.nestedComponents = state.nestedComponents.filter((widget => widget.id != value.payload.parent_id));

      console.log("REMOVE", state.nestedComponents)
    }
  },
})

// Action creators are generated for each case reducer function
export const { setCurrentScreen, insertAfter, remove } = currentScreen.actions

export default currentScreen.reducer
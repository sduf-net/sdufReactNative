import { createSlice } from '@reduxjs/toolkit'
import data from './../screens/screen_test'

const initialState = {
  id: 1,
  name: "index",
  nestedComponents: data
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
      state.nestedComponents = value.payload.nestedComponents
      state.id = value.payload.id
      state.name = value.payload.name
    }
  },
})

// Action creators are generated for each case reducer function
export const { setCurrentScreen } = currentScreen.actions

export default currentScreen.reducer
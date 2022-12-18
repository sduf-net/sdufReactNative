import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: null,
  name: "null",
  nestedComponents: null
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
    },
  },
})

// Action creators are generated for each case reducer function
export const { setCurrentScreen } = currentScreen.actions

export default currentScreen.reducer
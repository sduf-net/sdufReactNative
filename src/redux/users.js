import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: "user:anonim:123456788"
}

export const currentUser = createSlice({
  name: 'setUser',
  initialState,
  reducers: {
    setCurrentUser: (state, value) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.id = value.payload.id
    }
  },
})

// Action creators are generated for each case reducer function
export const { setCurrentUser } = currentUser.actions

export default currentUser.reducer
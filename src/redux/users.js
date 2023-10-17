import { createSlice } from '@reduxjs/toolkit'
import { removeUser, saveUser } from '../socket/auth'

const initialState = {
  id: "user:anonim:123456788",
  token: null,
  loggedIn: false
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
      state.token = value.payload.token
      state.loggedIn = true

      saveUser(state);
    },
    logOut: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.id = "user:anonim:123456788"
      state.token = null
      state.loggedIn = false

      removeUser();
    }
  },
})

// Action creators are generated for each case reducer function
export const { setCurrentUser, logOut } = currentUser.actions

export default currentUser.reducer
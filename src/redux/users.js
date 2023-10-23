import { createSlice } from '@reduxjs/toolkit'
import { removeUser, saveUser } from '../auth/auth'

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
      state.id = value.payload.id
      state.token = value.payload.token
      state.loggedIn = true

      saveUser(state);
    },
    logOut: (state) => {
      state.id = "user:anonim:123456788"
      state.token = null
      state.loggedIn = false

      removeUser();
    }
  },
})

export const { setCurrentUser, logOut } = currentUser.actions

export default currentUser.reducer
import { createSlice } from '@reduxjs/toolkit'
import { removeUser, saveUser } from '../auth/auth'
import uuid from 'react-native-uuid';
import { APP_ENV } from "@env";

const initialState = {
  id: APP_ENV + ":anonym:" + uuid.v4(),
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
      state.id = APP_ENV + ":anonym:" + uuid.v4()
      state.token = null
      state.loggedIn = false

      removeUser();
    }
  },
})

export const { setCurrentUser, logOut } = currentUser.actions

export default currentUser.reducer
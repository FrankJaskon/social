import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { AuthScheme } from '../types/auth'

import { User } from '@/entities/user'

const initialState: AuthScheme = {
  accessToken: undefined,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthScheme>) => {
      const { accessToken } = action.payload

      state.accessToken = accessToken
    },
    setUser: (state, action: PayloadAction<User>) => {
      const userData = action.payload

      state.user = userData
    },
    logOut: state => {
      const { accessToken } = initialState

      state.accessToken = accessToken
    },
  },
})

export const { actions: authActions } = authSlice
export const { reducer: authReducer } = authSlice

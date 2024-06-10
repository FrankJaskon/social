import { createSlice } from '@reduxjs/toolkit'

import { AppScheme } from '../types/app-scheme'

const initialState: AppScheme = {
  _initialized: undefined,
}

export const appSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setInitialized: state => {
      if (state._initialized) return
      state._initialized = true
    },
  },
})

export const { actions: appActions } = appSlice
export const { reducer: appReducer } = appSlice

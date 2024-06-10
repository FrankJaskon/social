import { configureStore, ReducersMapObject } from '@reduxjs/toolkit'

import { StateSchema } from './StateSchema'

import { authReducer } from '@/features/auth'
import { rtkApi } from '@/shared/api/rtk-api'
import { appReducer } from '@/widgets/page-wrapper'

export const createReduxStore = (initialState?: StateSchema) => {
  const rootReducer: ReducersMapObject<StateSchema> = {
    app: appReducer,
    auth: authReducer,
    [rtkApi.reducerPath]: rtkApi.reducer,
  }

  const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    preloadedState: initialState,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(rtkApi.middleware),
  })

  return store
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']

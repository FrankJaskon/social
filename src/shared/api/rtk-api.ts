import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'

import { __API_URL__ } from '../consts/global'

import { StateSchema } from '@/app/providers/store-provider'
import { getAccessToken } from '@/features/auth/model/selectors/auth-selector'

const baseQuery = fetchBaseQuery({
  baseUrl: __API_URL__,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const accessToken = getAccessToken(getState() as StateSchema)

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`)
    }

    return headers
  },
})

const mutex = new Mutex()

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  await mutex.waitForUnlock()
  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()

      try {
        const refreshResult = await baseQuery(
          {
            url: '/auth/refresh-token',
            method: 'GET',
          },
          api,
          extraOptions
        )

        if (refreshResult.meta?.response?.status === 204) {
          result = await baseQuery(args, api, extraOptions)
        } else {
          await baseQuery(
            {
              url: '/auth/logout',
              method: 'POST',
            },
            api,
            extraOptions
          )
        }
      } finally {
        release()
      }
    } else {
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result
}

export const rtkApi = createApi({
  reducerPath: 'rtkApi',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
})

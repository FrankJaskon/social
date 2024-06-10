import { AuthScheme, LoginFormType, RegistrationFormType } from '../model/types/auth'

import { User } from '@/entities/user'
import { rtkApi } from '@/shared/api/rtk-api'

export type ResendRoute = 'pass' | 'email'

export const authAPI = rtkApi.injectEndpoints({
  endpoints: build => ({
    login: build.mutation<AuthScheme, LoginFormType>({
      query: (body: LoginFormType) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
    registration: build.mutation<void, RegistrationFormType>({
      query: (body: RegistrationFormType) => ({
        url: '/auth/registration',
        method: 'POST',
        body,
      }),
    }),
    checkAuth: build.query<AuthScheme, void>({
      query: () => ({
        url: '/auth/refresh-token',
        method: 'GET',
      }),
    }),
    me: build.query<User, void>({
      query: () => ({
        url: '/auth/me',
      }),
    }),
    logout: build.mutation<void, void>({
      query: () => {
        return {
          method: 'POST',
          url: '/auth/logout',
        }
      },
    }),
    resendEmail: build.mutation<{ email: string }, { code: string; route: ResendRoute }>({
      query: ({ code, route }: { code: string; route: ResendRoute }) => ({
        url: `/auth/code-email-resending/${route}`,
        method: 'POST',
        body: { code },
      }),
    }),
    recoverPassword: build.mutation<void, { email: string }>({
      query: (body: { email: string }) => ({
        url: '/auth/password-recovery',
        method: 'POST',
        body,
      }),
    }),
    createNewPassword: build.mutation<void, { newPassword: string; hush: string }>({
      query: (body: { newPassword: string; hush: string }) => ({
        url: '/auth/new-password',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useLogoutMutation,
  useLazyCheckAuthQuery,
  useLazyMeQuery,
  useRegistrationMutation,
  useResendEmailMutation,
  useRecoverPasswordMutation,
  useCreateNewPasswordMutation,
} = authAPI

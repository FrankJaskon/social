export { RegistrationForm } from './ui/register/registration-form'
export { LoginForm } from './ui/login/login-form'
export { PasswordRecoveryForm } from './ui/password-recovery/password-recovery-form'
export { NewPasswordForm } from './ui/new-password/new-password-form'
export { LogoutButton } from './ui/logout-button/logout-button'

export { useLazyCheckAuthQuery, useLazyMeQuery } from './api/auth-api'

export type { AuthScheme } from './model/types/auth'

export { authActions, authReducer } from './model/slices/auth-slice'

export {
  useGetUserAuthorized,
  getAccessToken,
  useGetUserData,
  getUserData,
} from './model/selectors/auth-selector'

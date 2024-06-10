import { User } from '@/entities/user'

export interface LoginFormType {
  email: string
  password: string
  root: undefined
}

export interface RegistrationFormType extends LoginFormType {
  username: string
  email: string
  password: string
  confirm: string
  read: boolean
}

export interface NewPasswordFormType {
  password: string
  confirm: string
}

export interface PasswordRecoveryFormType {
  email: string
}

export interface AuthScheme {
  accessToken?: string
  user?: User
}

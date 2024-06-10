import { z } from 'zod'

import { emailRegex, passwordRegex, usernameRegex } from '../consts/auth'

export interface GetUsernameValidationProps {
  min?: number
  max?: number
}

export const getUsernameValidation = ({ min = 6, max = 30 }: GetUsernameValidationProps) => {
  return z
    .string()
    .trim()
    .nonempty('nonemptyUsername')
    .regex(usernameRegex, 'regexUsername')
    .min(min, 'minUsername')
    .max(max, 'maxUsername')
}

export interface EmailValidationErrors {
  nonempty: string
  email: string
}

export const getEmailValidation = () =>
  z.string().trim().nonempty('nonemptyEmail').regex(emailRegex, 'regexEmail')

export interface PasswordValidationProps {
  min?: number
  max?: number
  regex?: RegExp
  regexError?: string
}

export const getPasswordValidation = ({
  min = 6,
  max = 20,
  regex,
  regexError,
}: PasswordValidationProps) => {
  return z
    .string()
    .trim()
    .nonempty('nonemptyPassword')
    .min(min, 'minPassword')
    .regex(regex ?? passwordRegex, regexError ?? 'regexPasswordMustContain')
    .max(max, 'maxPassword')
}

export const getConfirmPasswordValidation = () => {
  return z.string().trim().nonempty('nonemptyConfirm')
}

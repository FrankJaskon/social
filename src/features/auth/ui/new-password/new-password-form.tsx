import React, { FC, memo, useCallback, useEffect, useMemo, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { UseFormSetError, useForm } from 'react-hook-form'
import { z } from 'zod'

import { useCreateNewPasswordMutation } from '../../api/auth-api'
import { getConfirmPasswordValidation, getPasswordValidation } from '../../helpers/auth-validation'
import { NewPasswordFormType } from '../../model/types/auth'
import { AuthHeader } from '../header/header'

import cls from './new-password-form.module.scss'

import { getLoginRoute, getRegistrationRoute } from '@/shared/consts/route-paths'
import { useTranslation } from '@/shared/hooks/use-translation'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { ControlledInput } from '@/shared/ui/controlled/controlled-input'
import { FormError } from '@/shared/ui/form-error'
import { Typography } from '@/shared/ui/typography'

export interface NewPasswordFormProps {
  token?: string
}

export const NewPasswordForm: FC<NewPasswordFormProps> = memo((props: NewPasswordFormProps) => {
  const { token: recoveryCode } = props
  const { t } = useTranslation()
  const router = useRouter()
  const newPasswordSchema = useMemo(() => getNewPasswordSchema(), [])
  const {
    watch,
    setError,
    reset,
    formState: { isValid },
    control,
    handleSubmit,
  } = useForm<NewPasswordFormType>({
    resolver: zodResolver(newPasswordSchema),
    mode: 'onBlur',
    defaultValues: { password: '', confirm: '' },
  })
  const [createNewPassword, { isLoading }] = useCreateNewPasswordMutation()
  const [serverError, setServerError] = useState<string | undefined>()

  const onSubmit = useCallback(
    async (data: NewPasswordFormType) => {
      try {
        await createNewPassword({
          newPassword: data.password,
          hush: recoveryCode!,
        }).unwrap()
        reset()
        router.push(getLoginRoute())
      } catch (e: any) {
        if (e?.status === 500) {
          console.error(e)
          setServerError('noResponse')
        } else {
          console.error(e)
          setServerError('requestFailed')
        }
      }
    },
    [createNewPassword, recoveryCode, reset, router]
  )

  const onInputChange = useCallback(() => {
    setServerError(undefined)
  }, [setServerError])

  const password = watch('password')
  const confirm = watch('confirm')

  useSyncPasswords(password, confirm, setError)

  if (!recoveryCode) {
    router.push(getRegistrationRoute())
  }

  return (
    <Card width="small" align="center" pBottom="big">
      <AuthHeader title={t.auth.newPasswordTitle} titleOnly />
      <form onSubmit={handleSubmit(onSubmit)} className={cls.form}>
        <ControlledInput
          type={'password'}
          label={t.auth.passwordLabel}
          control={control}
          name={'password'}
          callback={onInputChange}
        />
        <ControlledInput
          type={'password'}
          label={t.auth.passwordConfirmation}
          control={control}
          name={'confirm'}
          callback={onInputChange}
        />
        <FormError error={serverError} />
        <Typography variant="regular_14" align="start" color="tip" className={cls.tip}>
          {t.auth.newPasswordDescription}
        </Typography>
        <Button
          disabled={isLoading || !isValid}
          className={cls.btnSingUp}
          fullWidth
          type={'submit'}
        >
          <Typography color="inherit" variant="h3">
            {isLoading ? t.auth.sendLoader : t.auth.newPasswordButton}
          </Typography>
        </Button>
      </form>
    </Card>
  )
})

const getNewPasswordSchema = () =>
  z
    .object({
      password: getPasswordValidation({}),
      confirm: getConfirmPasswordValidation(),
    })
    .refine(data => data.password === data.confirm, {
      message: 'passwordsMustMatch',
      path: ['confirm'],
    })

const useSyncPasswords = (
  password: string,
  confirm: string,
  setError: UseFormSetError<NewPasswordFormType>
) => {
  useEffect(() => {
    if (password !== confirm) {
      setError('confirm', {
        type: 'manual',
        message: 'passwordsMustMatch',
      })
    } else {
      setError('confirm', {})
    }
  }, [password, confirm, setError])
}

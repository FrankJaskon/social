import React, { memo, useCallback, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useLazyMeQuery, useLoginMutation } from '../../api/auth-api'
import { authActions } from '../../model/slices/auth-slice'
import { LoginFormType } from '../../model/types/auth'
import { AuthFooter } from '../footer/footer'
import { AuthHeader } from '../header/header'

import cls from './login-form.module.scss'

import { getForgotPasswordRoute, getProfileRoute } from '@/shared/consts/route-paths'
import { useAppDispatch } from '@/shared/hooks/use-app-dispatch'
import { useTranslation } from '@/shared/hooks/use-translation'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { ControlledInput } from '@/shared/ui/controlled/controlled-input'
import { FormError } from '@/shared/ui/form-error'
import { Typography } from '@/shared/ui/typography'

const loginSchema = z.object({
  email: z.string().trim().nonempty('nonemptyEmail'),
  password: z.string().trim().nonempty('nonemptyPassword'),
})

export const LoginForm = memo(() => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const {
    setError,
    reset,
    formState: { isValid, errors },
    control,
    handleSubmit,
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    defaultValues: { email: '', password: '', root: undefined },
  })
  const [login, { isLoading }] = useLoginMutation()
  const [meRequest] = useLazyMeQuery()
  const [serverError, setServerError] = useState<string | undefined>()

  const onSubmit = useCallback(
    async (data: LoginFormType) => {
      setServerError(undefined)
      try {
        const response = await login(data).unwrap()

        if (!response) throw new Error(t.errors.loginFailed)

        dispatch(authActions.setCredentials(response))

        const meResponse = await meRequest().unwrap()

        if (!meResponse) throw new Error(t.errors.requestFailed)

        dispatch(authActions.setUser(meResponse))

        router.push(getProfileRoute())
        reset()
      } catch (e: any) {
        if (e?.status === 500) {
          console.error(e)
          setServerError('noResponse')
        } else if (e?.status === 401) {
          console.error(e)
          setError('root', { message: 'loginIncorrectData' })
        } else {
          console.error(e)
          setServerError('loginFailed')
        }
      }
    },
    [
      login,
      t.errors.loginFailed,
      t.errors.requestFailed,
      dispatch,
      meRequest,
      router,
      reset,
      setError,
    ]
  )

  const onInputChange = useCallback(() => {
    setError('root', {})
    setServerError(undefined)
  }, [setError])

  return (
    <Card width="small" align="center">
      <AuthHeader title={t.auth.signinTitle} />
      <form onSubmit={handleSubmit(onSubmit)} className={cls.form}>
        <ControlledInput
          label={t.auth.emailLabel}
          control={control}
          name="email"
          type="email"
          callback={onInputChange}
          error={errors?.root?.message && ' '}
        />
        <ControlledInput
          type={'password'}
          label={t.auth.passwordLabel}
          control={control}
          name={'password'}
          callback={onInputChange}
          error={errors?.root?.message}
        />
        <FormError error={serverError} />
        <Button
          className={cls.forgotPassword}
          as="a"
          variant="link"
          href={getForgotPasswordRoute()}
        >
          <Typography variant="regular_14" color="tip" clickable>
            {t.auth.forgotPassword}
          </Typography>
        </Button>
        <Button
          disabled={!isValid || isLoading}
          className={cls.btnSingUp}
          fullWidth
          type={'submit'}
        >
          <Typography color="inherit" variant="h3">
            {isLoading ? t.auth.loginLoader : t.auth.signin}
          </Typography>
        </Button>
      </form>
      <AuthFooter isRegistration={false} />
    </Card>
  )
})

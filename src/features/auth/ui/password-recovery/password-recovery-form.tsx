import React, { memo, useCallback, useMemo, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useRecoverPasswordMutation } from '../../api/auth-api'
import { getEmailValidation } from '../../helpers/auth-validation'
import { PasswordRecoveryFormType } from '../../model/types/auth'
import { AuthHeader } from '../header/header'

import cls from './password-recovery-form.module.scss'

import { ReCaptcha } from '@/entities/recaptcha'
import { getLoginRoute } from '@/shared/consts/route-paths'
import { useTranslation } from '@/shared/hooks/use-translation'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { ControlledInput } from '@/shared/ui/controlled/controlled-input'
import { FormError } from '@/shared/ui/form-error'
import { Typography } from '@/shared/ui/typography'

const loginSchema = z.object({
  email: getEmailValidation(),
})

export const PasswordRecoveryForm = memo(() => {
  const { t } = useTranslation()
  const [recoverPassword, { isLoading }] = useRecoverPasswordMutation()
  const {
    setError,
    getValues,
    formState: { isValid },
    control,
    handleSubmit,
  } = useForm<PasswordRecoveryFormType>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    defaultValues: { email: '' },
  })
  const [isSent, setIsSent] = useState(false)
  const [isCaptcha, setIsCaptcha] = useState(false)
  const [serverError, setServerError] = useState<string | undefined>()

  const onSubmit = useCallback(
    async (data: PasswordRecoveryFormType) => {
      setServerError(undefined)
      setIsSent(false)
      setIsCaptcha(false)
      try {
        await recoverPassword(data).unwrap()

        setIsSent(true)
      } catch (e: any) {
        if (e?.status === 500) {
          console.error(e)
          setServerError('noResponse')
        } else if (e?.status === 404) {
          console.error(e)
          setError('email', { message: 'emailNotFound' })
        } else {
          console.error(e)
          setServerError('requestFailed')
        }
      }
    },
    [recoverPassword, setError]
  )

  const sendLinkAgain = useCallback(() => {
    const email = getValues('email')

    onSubmit({ email })
  }, [getValues, onSubmit])

  const onInputChange = useCallback(() => {
    setServerError(undefined)
  }, [setServerError])

  return (
    <Card width="small" align="center">
      <AuthHeader title={t.auth.passwordRecoveryTitle} titleOnly />
      <form onSubmit={handleSubmit(onSubmit)} className={cls.form}>
        <ControlledInput
          label={t.auth.emailLabel}
          control={control}
          name="email"
          type="email"
          callback={onInputChange}
          readOnly={isSent}
        />

        <FormError error={serverError} />

        <Typography variant="regular_14" align="start" color="tip" className={cls.tip}>
          {t.auth.passwordRecoveryDescription}
        </Typography>
        {isSent && (
          <Typography variant="regular_14" align="start" className={cls.tip}>
            {t.auth.sentCodeToEmail(getValues('email'))}
          </Typography>
        )}
        {isSent ? (
          <Button
            disabled={!isValid || isLoading}
            className={cls.submitBtn}
            fullWidth
            type={'button'}
            onClick={sendLinkAgain}
          >
            <Typography color="inherit" variant="h3">
              {isLoading ? t.auth.sendLoader : t.auth.sendLinkAgain}
            </Typography>
          </Button>
        ) : (
          <Button
            disabled={!isValid || !isCaptcha || isLoading}
            className={cls.submitBtn}
            fullWidth
            type={'submit'}
          >
            <Typography color="inherit" variant="h3">
              {isLoading ? t.auth.sendLoader : t.auth.sendLink}
            </Typography>
          </Button>
        )}
      </form>
      <Button variant="link" href={getLoginRoute()} as="a" fullWidth>
        <Typography color="primary" variant="h3" clickable>
          {t.auth.backToLogin}
        </Typography>
      </Button>
      {!isSent && !isLoading && <ReCaptcha setIsCaptcha={setIsCaptcha} className={cls.captcha} />}
    </Card>
  )
})

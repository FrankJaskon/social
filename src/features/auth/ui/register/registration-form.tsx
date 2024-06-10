import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useRegistrationMutation } from '../../api/auth-api'
import {
  getConfirmPasswordValidation,
  getEmailValidation,
  getPasswordValidation,
  getUsernameValidation,
} from '../../helpers/auth-validation'
import { RegistrationFormType } from '../../model/types/auth'
import { AuthFooter } from '../footer/footer'
import { AuthHeader } from '../header/header'

import cls from './registration-form.module.scss'

import { EmailSentModal } from '@/entities/email-sent-modal'
import { getPrivacyPolicyRoute, getTermsOfServiceRoute } from '@/shared/consts/route-paths'
import { useTranslation } from '@/shared/hooks/use-translation'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { ControlledCheckbox } from '@/shared/ui/controlled/controlled-checkbox'
import { ControlledInput } from '@/shared/ui/controlled/controlled-input'
import { FormError } from '@/shared/ui/form-error'
import { Translation } from '@/shared/ui/translation'
import { Typography } from '@/shared/ui/typography'

export const RegistrationForm = memo(() => {
  const { t } = useTranslation()
  const registrationSchema = useMemo(() => getRegistrationSchema(), [])
  const [registration, { isLoading }] = useRegistrationMutation()
  const {
    reset,
    watch,
    getValues,
    setError,
    formState: { errors, isValid },
    control,
    handleSubmit,
  } = useForm<RegistrationFormType>({
    resolver: zodResolver(registrationSchema),
    mode: 'onBlur',
    defaultValues: { username: '', email: '', password: '', confirm: '', read: false },
  })
  const [serverErrors, setServerErrors] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const onSubmit = useCallback(
    async (data: RegistrationFormType) => {
      setServerErrors('')
      try {
        await registration(data).unwrap()

        setIsModalOpen(true)
      } catch (e: any) {
        if (e?.status === 500) {
          console.error(e)
          setServerErrors('noResponse')
        } else if (e?.status === 409) {
          console.error(e)
          const errorField = e?.data?.field

          if (errorField === 'UsernameAndEmail') {
            setError('email', { message: 'emailExists' })
            setError('username', { message: 'usernameExists' })

            return
          }
          if (errorField === 'Email') {
            setError('email', { message: 'emailExists' })

            return
          }
          if (errorField === 'Username') {
            setError('username', { message: 'usernameExists' })
          }
        } else {
          console.error(e)
          setServerErrors('requestFailed')
        }
      }
    },
    [registration, setError]
  )

  const onInputChange = useCallback(() => {
    setServerErrors('')
  }, [setServerErrors])

  const handleChangeModal = useCallback(
    (value: boolean) => {
      reset()
      setIsModalOpen(value)
    },
    [reset]
  )

  const password = watch('password')
  const confirm = watch('confirm')

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

  return (
    <Card width="small" align="center">
      <AuthHeader title={t.auth.signup} />
      <form onSubmit={handleSubmit(onSubmit)} className={cls.form}>
        <ControlledInput
          label={t.auth.username}
          control={control}
          name={'username'}
          placeholder="Epam"
          callback={onInputChange}
        />
        <ControlledInput label={t.auth.emailLabel} type="email" control={control} name={'email'} />
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
        {serverErrors && <FormError error={serverErrors} />}
        <div className={cls.checkboxWrap}>
          <ControlledCheckbox errorMessage={errors.read?.message} control={control} name={'read'} />
          <Typography variant="small_text">
            <Translation
              text={t.auth.termsPolicyLinks}
              tags={{
                '1': () => (
                  <Button
                    className={cls.forgotPassword}
                    as="a"
                    variant="custom"
                    href={getTermsOfServiceRoute()}
                  >
                    <Typography variant="link2" color="primary" as="span" clickable>
                      {t.auth.termsOfService}
                    </Typography>
                  </Button>
                ),
                '2': () => (
                  <Button
                    className={cls.forgotPassword}
                    as="a"
                    variant="custom"
                    href={getPrivacyPolicyRoute()}
                  >
                    <Typography variant="link2" color="primary" as="span" clickable>
                      {t.auth.privacyPolicy}
                    </Typography>
                  </Button>
                ),
              }}
            />
          </Typography>
        </div>
        <Button
          disabled={isLoading || !isValid}
          className={cls.btnSingUp}
          fullWidth
          type={'submit'}
        >
          <Typography color="inherit" variant="h3">
            {isLoading ? t.auth.signupLoader : t.auth.signup}
          </Typography>
        </Button>
      </form>
      <AuthFooter />
      <EmailSentModal
        isOpen={isModalOpen}
        onChange={handleChangeModal}
        email={getValues('email')}
      />
    </Card>
  )
})

const getRegistrationSchema = () =>
  z
    .object({
      username: getUsernameValidation({}),
      email: getEmailValidation(),
      password: getPasswordValidation({}),
      confirm: getConfirmPasswordValidation(),
      read: z.boolean(),
    })
    .refine(data => data.password === data.confirm, {
      message: 'passwordsMustMatch',
      path: ['confirm'],
    })
    .superRefine((data, ctx) => {
      if (!data.read) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'requiredTerms',
          path: ['read'],
        })
      }
    })

import React from 'react'

import clsx from 'clsx'
import { useRouter } from 'next/router'
import ReCAPTCHA from 'react-google-recaptcha'

import cls from './recaptcha.module.scss'

type PropsType = {
  setIsCaptcha: React.Dispatch<React.SetStateAction<boolean>>
  className?: string
}

export const ReCaptcha = (props: PropsType) => {
  const { setIsCaptcha, className } = props
  const { locale } = useRouter()

  const onChange = () => {
    setIsCaptcha(true)
  }

  return (
    <ReCAPTCHA
      theme="dark"
      sitekey="6LcUUPUnAAAAAKW5cZTW1FBipMHAYdlib0xlJVqW"
      onChange={onChange}
      className={clsx(cls.captcha, className)}
      hl={locale}
    />
  )
}

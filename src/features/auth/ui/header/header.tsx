import { FC, memo, useCallback } from 'react'

import cls from './header.module.scss'

import { GitHubIcon } from '@/shared/assets/icons/github-icon'
import { GoogleIcon } from '@/shared/assets/icons/google-icon'
import { __API_URL__, __FRONTEND_URL__ } from '@/shared/consts/global'
import { getProfileRoute } from '@/shared/consts/route-paths'
import { Typography } from '@/shared/ui/typography'

export interface AuthHeaderProps {
  title: string
  titleOnly?: boolean
}

export const AuthHeader: FC<AuthHeaderProps> = memo((props: AuthHeaderProps) => {
  const { title, titleOnly = false } = props

  const openPopup = (URL: string) => {
    const width = 600
    const height = 700
    const left = window.innerWidth / 2 - width / 2
    const top = window.innerHeight / 2 - height / 2

    window.open(
      URL,
      'Google Login',
      `popup,toolbar=no,menubar=no,width=${width},height=${height},top=${top},left=${left}`
    )
  }

  const handleGoogle = useCallback(() => {
    openPopup(`${__API_URL__}/auth/google`)
  }, [])

  const handleGithub = useCallback(() => {
    openPopup(`${__API_URL__}/auth/github`)
  }, [])

  window.addEventListener('message', event => {
    if (event.origin === __FRONTEND_URL__) {
      const data = event.data

      if (data && data.authenticated) {
        window.location.assign(`${__FRONTEND_URL__}${getProfileRoute()}`)
      }
    }
  })

  return (
    <>
      <Typography align="center" className={cls.title} variant="h1">
        {title}
      </Typography>
      {!titleOnly && (
        <div className={cls.icons}>
          <GoogleIcon className={cls.icon} onClick={handleGoogle} />
          <GitHubIcon className={cls.icon} onClick={handleGithub} />
        </div>
      )}
    </>
  )
})

import { FC, memo, useMemo } from 'react'

import cls from './footer.module.scss'

import { getLoginRoute, getRegistrationRoute } from '@/shared/consts/route-paths'
import { useTranslation } from '@/shared/hooks/use-translation'
import { Button } from '@/shared/ui/button'
import { Typography } from '@/shared/ui/typography'

export interface AuthFooterProps {
  isRegistration?: boolean
}

export const AuthFooter: FC<AuthFooterProps> = memo((props: AuthFooterProps) => {
  const { isRegistration = true } = props

  const { t } = useTranslation()

  const href = useMemo(
    () => (isRegistration ? getLoginRoute() : getRegistrationRoute()),
    [isRegistration]
  )

  const text = useMemo(
    () => (isRegistration ? t.auth.haveAccount : t.auth.notHaveAccount),
    [t, isRegistration]
  )

  const buttonContent = useMemo(
    () => (isRegistration ? t.auth.signin : t.auth.signup),
    [t, isRegistration]
  )

  return (
    <>
      <Typography align="center" className={cls.footerTitle} variant="regular_16">
        {text}
      </Typography>
      <Button className={cls.btnSignIn} variant="link" href={href} as="a" fullWidth>
        <Typography align="center" color="primary" variant="h3" clickable>
          {buttonContent}
        </Typography>
      </Button>
    </>
  )
})

import React, { PropsWithChildren, useState, useEffect } from 'react'

import { clsx } from 'clsx'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'

import { Typography } from '../typography'

import cls from './active-link.module.scss'

type ActiveLinkProps = LinkProps & {
  className?: string
  activeClassName?: string
}

export const ActiveLink = ({
  children,
  activeClassName = '',
  className = '',
  ...props
}: PropsWithChildren<ActiveLinkProps>) => {
  const { asPath, isReady } = useRouter()
  const [computedClassName, setComputedClassName] = useState(className)

  useEffect(() => {
    if (isReady) {
      const linkPathname = new URL((props.as || props.href) as string, location.href).pathname
      const activePathname = new URL(asPath, location.href).pathname
      const isActive = linkPathname === activePathname

      const mods: Record<string, boolean> = {
        [cls.active]: !activeClassName && isActive,
        activeClassName: Boolean(activeClassName) && isActive,
      }

      const newClassName = clsx(className, mods)

      if (newClassName !== computedClassName) {
        setComputedClassName(newClassName)
      }
    }
  }, [asPath, isReady, props.as, props.href, activeClassName, className, computedClassName])

  return (
    <Link {...props}>
      <Typography className={computedClassName} variant="medium_14">
        {children}
      </Typography>
    </Link>
  )
}

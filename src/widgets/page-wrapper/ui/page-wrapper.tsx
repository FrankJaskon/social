import { useEffect, useMemo } from 'react'

import { clsx } from 'clsx'
import { useRouter } from 'next/router'

import { useGetInitialized } from '../model/selectors/app-selector'

import cls from './page-wrapper.module.scss'

import { useGetUserAuthorized } from '@/features/auth'
import { getHomeRoute, getRegistrationRoute } from '@/shared/consts/route-paths'
import { PageLoader } from '@/shared/ui/page-loader'
import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'
import { Sidebar } from '@/widgets/sidebar'

type PaddingTopType = 'small' | 'normal' | 'big'

export interface PageWrapperProps {
  children: React.ReactNode
  className?: string
  paddingTop?: PaddingTopType
  hCentered?: boolean
  vCentered?: boolean
  withSidebar?: boolean
  withFooter?: boolean
}

export const PageWrapper: React.FC<PageWrapperProps> = props => {
  const {
    children,
    className,
    paddingTop = 'big',
    hCentered,
    vCentered,
    withSidebar = true,
    withFooter = true,
  } = props
  const initialized = useRedirectValidation()

  const mods: Record<string, boolean | undefined> = useMemo(
    () => ({
      [cls.vCentered]: vCentered,
      [cls.hCentered]: hCentered,
    }),
    [hCentered, vCentered]
  )

  const extraClasses: (string | undefined)[] = useMemo(
    () => [className, cls[paddingTop]],
    [className, paddingTop]
  )

  return (
    <>
      <Header />
      {initialized ? (
        <main className={cls.flexContainer}>
          {withSidebar && <Sidebar />}
          {<div className={clsx(cls.pageWrapper, extraClasses, mods)}>{children}</div>}
        </main>
      ) : (
        <PageLoader />
      )}
      {withFooter && <Footer />}
    </>
  )
}

const useRedirectValidation = () => {
  const { push, pathname } = useRouter()
  const initialized = useGetInitialized()
  const authorized = useGetUserAuthorized()

  useEffect(() => {
    if (initialized) {
      const redirectPath = getRegistrationRoute()

      if (!authorized && !pathname.startsWith(redirectPath)) {
        push(redirectPath)
      }
      if (authorized && pathname.startsWith(redirectPath)) {
        push(getHomeRoute())
      }
    }
  }, [initialized])

  return initialized
}

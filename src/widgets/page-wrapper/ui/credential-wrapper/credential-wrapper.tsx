import { FC, ReactNode, useEffect } from 'react'

import { appActions } from '../../model/slices/app-slice'

import { useLazyCheckAuthQuery, useLazyMeQuery, authActions } from '@/features/auth'
import { useAppDispatch } from '@/shared/hooks/use-app-dispatch'
import { useTranslation } from '@/shared/hooks/use-translation'

export interface CredentialWrapperProps {
  className?: string
  children: ReactNode
}

export const CredentialWrapper: FC<CredentialWrapperProps> = props => {
  const { className, children } = props
  const [meRequest] = useLazyMeQuery()
  const [refreshTokensRequest] = useLazyCheckAuthQuery()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const makeRefreshTokenRequest = async () => {
    if (!window.opener) {
      try {
        const response = await refreshTokensRequest().unwrap()

        if (!response) throw new Error(t.errors.requestFailed)

        dispatch(authActions.setCredentials(response))
        dispatch(appActions.setInitialized())

        const meResponse = await meRequest().unwrap()

        if (!meResponse) throw new Error(t.errors.requestFailed)

        dispatch(authActions.setUser(meResponse))
      } catch (e: any) {
        console.error(e)
        dispatch(appActions.setInitialized())
      }
    }
  }

  useEffect(() => {
    makeRefreshTokenRequest()
  }, [])

  return <div className={className}>{children}</div>
}

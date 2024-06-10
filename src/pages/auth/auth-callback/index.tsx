import { useEffect } from 'react'

import cls from './auth-callback.module.scss'

import { __FRONTEND_URL__ } from '@/shared/consts/global'
import { PageLoader } from '@/shared/ui/page-loader'

const AuthCallback: React.FC = () => {
  useEffect(() => {
    window.opener?.postMessage?.({ authenticated: true }, __FRONTEND_URL__)
    window.close()
  }, [])

  return <PageLoader className={cls.fullHeightWindow} />
}

export default AuthCallback

import { useCallback, useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { useGetUserData } from '../..'
import { useLogoutMutation } from '../../api/auth-api'
import { authActions } from '../../model/slices/auth-slice'

import cls from './logout-button.module.scss'

import { getLoginRoute } from '@/shared/consts/route-paths'
import { useAppDispatch } from '@/shared/hooks/use-app-dispatch'
import { useTranslation } from '@/shared/hooks/use-translation'
import { Blank } from '@/shared/ui/blank'
import { Button } from '@/shared/ui/button'
import { Modal } from '@/shared/ui/modal'
import { Typography } from '@/shared/ui/typography'

export const LogoutButton = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [logout] = useLogoutMutation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const user = useGetUserData()

  const handleClick = useCallback(async () => {
    try {
      await logout()
      dispatch(authActions.setCredentials({}))
      router.push(getLoginRoute())
    } catch (e) {
      console.error(e)
    }
  }, [dispatch, logout, router])

  return (
    <Modal
      isOpen={isModalOpen}
      onOpenChange={setIsModalOpen}
      title={t.sidebar.logout}
      renderActionButton={() => (
        <div className={cls.buttonGroup}>
          <Button onClick={handleClick} className={cls.modalButton} variant="outlined">
            <Typography color="inherit" variant="h3">
              {t.yes}
            </Typography>
          </Button>
          <Button onClick={() => setIsModalOpen(false)} className={cls.modalButton}>
            <Typography color="inherit" variant="h3">
              {t.no}
            </Typography>
          </Button>
        </div>
      )}
      trigger={
        <Button className={cls.flexWrapper} variant="custom" onClick={() => setIsModalOpen(true)}>
          <Blank />
          <Typography>{t.sidebar.logout}</Typography>
        </Button>
      }
    >
      <Typography variant="regular_16">{t.auth.logOutModal(user?.email ?? '')}</Typography>
    </Modal>
  )
}

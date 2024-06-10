import { useCallback, useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'

import cls from './expired.module.scss'

import { EmailSentModal } from '@/entities/email-sent-modal'
import { ResendRoute, useResendEmailMutation } from '@/features/auth/api/auth-api'
import ExpiredImg from '@/shared/assets/img/link-expired.png'
import { useTranslation } from '@/shared/hooks/use-translation'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { FormError } from '@/shared/ui/form-error'
import { Typography } from '@/shared/ui/typography'
import { PageWrapper } from '@/widgets/page-wrapper'

const Expired: React.FC = () => {
  const { query } = useRouter()
  const { code, route } = query
  const { t } = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [email, setEmail] = useState<string | undefined>()
  const [resendEmail, { isLoading }] = useResendEmailMutation()
  const [serverError, setServerError] = useState<string | undefined>()

  const handleClick = useCallback(async () => {
    setServerError(undefined)
    try {
      const { email: userEmail } = await resendEmail({ code, route } as {
        code: string
        route: ResendRoute
      }).unwrap()

      setEmail(userEmail)
      setIsModalOpen(true)
    } catch (e: any) {
      if (e?.status === 500) {
        console.error(e)
        setServerError('noResponse')
      } else {
        console.error(e)
        setServerError('requestFailed')
      }
    }
  }, [code, resendEmail, route])

  return (
    <PageWrapper hCentered paddingTop="big" withFooter={false} withSidebar={false}>
      <Card width="medium" align="center" variant="custom">
        <div className={cls.container}>
          <Typography variant="h1" align="center" className={cls.title}>
            {t.auth.emailExpired}
          </Typography>
          <Typography variant="regular_16" align="center" className={cls.description}>
            {t.auth.expiredDescription}
          </Typography>
          <Button
            variant="primary"
            className={cls.button}
            onClick={handleClick}
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? t.auth.sendLoader : t.auth.resendLink}
          </Button>
          {serverError && <FormError error={serverError} className={cls.error} />}
        </div>
        <Image
          src={ExpiredImg}
          alt="unsuccessful confirmation"
          className={cls.img}
          priority={true}
        />
      </Card>
      <EmailSentModal isOpen={isModalOpen} onChange={setIsModalOpen} email={email} />
    </PageWrapper>
  )
}

export default Expired

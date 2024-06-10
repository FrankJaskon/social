import Image from 'next/image'

import cls from './confirm.module.scss'

import ConfirmImg from '@/shared/assets/img/confirm-success.png'
import { getLoginRoute } from '@/shared/consts/route-paths'
import { useTranslation } from '@/shared/hooks/use-translation'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Typography } from '@/shared/ui/typography'
import { PageWrapper } from '@/widgets/page-wrapper'

const Confirm: React.FC = () => {
  const { t } = useTranslation()

  return (
    <PageWrapper hCentered paddingTop="big" withFooter={false} withSidebar={false}>
      <Card width="medium" align="center" variant="custom">
        <Typography variant="h1" align="center" className={cls.title}>
          {t.auth.congratulations}
        </Typography>
        <Typography variant="regular_16" align="center" className={cls.description}>
          {t.auth.emailConfirmed}
        </Typography>
        <Button variant="primary" href={getLoginRoute()} as="a" className={cls.button}>
          <Typography align="center" variant="h3" className={cls.signin}>
            {t.auth.signin}
          </Typography>
        </Button>
        <Image src={ConfirmImg} alt="successful signup" className={cls.img} priority={true} />
      </Card>
    </PageWrapper>
  )
}

export default Confirm

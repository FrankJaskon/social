import { FC, memo } from 'react'

import { useRouter } from 'next/router'

import { NewPasswordForm } from '@/features/auth'
import { PageWrapper } from '@/widgets/page-wrapper'

const ForgotPassword: FC = memo(() => {
  const {
    query: { token },
  } = useRouter()

  return (
    <PageWrapper hCentered paddingTop="normal" withFooter={false} withSidebar={false}>
      <NewPasswordForm token={token as string} />
    </PageWrapper>
  )
})

export default ForgotPassword

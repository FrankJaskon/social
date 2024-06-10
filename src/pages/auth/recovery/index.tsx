import { PasswordRecoveryForm } from '@/features/auth'
import { PageWrapper } from '@/widgets/page-wrapper'

const ForgotPassword: React.FC = () => {
  return (
    <PageWrapper hCentered paddingTop="normal" withFooter={false} withSidebar={false}>
      <PasswordRecoveryForm />
    </PageWrapper>
  )
}

export default ForgotPassword

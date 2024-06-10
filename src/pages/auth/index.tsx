import { RegistrationForm } from '@/features/auth'
import { PageWrapper } from '@/widgets/page-wrapper'

const Registration: React.FC = () => {
  return (
    <PageWrapper hCentered paddingTop="small" withFooter={false} withSidebar={false}>
      <RegistrationForm />
    </PageWrapper>
  )
}

export default Registration

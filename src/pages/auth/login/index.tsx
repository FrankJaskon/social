import { LoginForm } from '@/features/auth'
import { PageWrapper } from '@/widgets/page-wrapper'

const Login: React.FC = () => {
  return (
    <PageWrapper hCentered paddingTop="normal" withFooter={false} withSidebar={false}>
      <LoginForm />
    </PageWrapper>
  )
}

export default Login

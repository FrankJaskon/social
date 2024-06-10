import { PageWrapper } from '@/widgets/page-wrapper'
import { TermsAndPolicyComponent } from '@/widgets/terms-policy'

const TermsOfService: React.FC = () => {
  return (
    <PageWrapper hCentered paddingTop="normal" withFooter={false} withSidebar={false}>
      <TermsAndPolicyComponent />
    </PageWrapper>
  )
}

export default TermsOfService

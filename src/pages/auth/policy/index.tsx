import { PageWrapper } from '@/widgets/page-wrapper'
import { TermsAndPolicyComponent } from '@/widgets/terms-policy'

const PrivacyPolicy: React.FC = () => {
  return (
    <PageWrapper hCentered paddingTop="normal" withFooter={false} withSidebar={false}>
      <TermsAndPolicyComponent isPolicy />
    </PageWrapper>
  )
}

export default PrivacyPolicy

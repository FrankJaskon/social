import cls from './email-sent-modal.module.scss'

import { useTranslation } from '@/shared/hooks/use-translation'
import { Button } from '@/shared/ui/button'
import { Modal } from '@/shared/ui/modal'
import { Typography } from '@/shared/ui/typography'

export interface EmailSentModalProps {
  isOpen: boolean
  onChange: (value: boolean) => void
  email?: string
}

export const EmailSentModal: React.FC<EmailSentModalProps> = props => {
  const { isOpen, onChange, email } = props
  const { t } = useTranslation()

  if (!email) return null

  return (
    <Modal
      isOpen={isOpen}
      title={t.auth.emailSent}
      onOpenChange={onChange}
      width="small"
      renderActionButton={() => (
        <Button onClick={() => onChange(false)} className={cls.modalButton}>
          <Typography color="inherit" variant="h3">
            OK
          </Typography>
        </Button>
      )}
    >
      <Typography variant="regular_16">{t.auth.sentCodeToEmail(email)}</Typography>
    </Modal>
  )
}

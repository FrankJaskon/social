import cls from './modal-control.module.scss'

import { ActionButton } from '@/shared/ui/modal/modal-control/cards-buttons/ActionButton'
import { CancelButton } from '@/shared/ui/modal/modal-control/cards-buttons/CancelButton'

type ModalControlPropType = {
  closedModal: () => void
  onSubmit: () => void
  title: string
}

export const ModalControl = ({ closedModal, onSubmit, title }: ModalControlPropType) => {
  return (
    <div className={cls.footer}>
      <CancelButton onClick={closedModal} />
      <ActionButton onClick={onSubmit} title={title} />
    </div>
  )
}

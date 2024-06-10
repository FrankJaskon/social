import styles from './prev-button.module.scss'

import { KeyboardArrowLeft } from '@/shared/assets/icons/keyboard-arrow-left'

type NavigationButtonProps = {
  onClick: () => void
  disabled?: boolean
}

export const PrevButton = ({ onClick, disabled }: NavigationButtonProps) => {
  return (
    <button className={styles.item} onClick={onClick} disabled={disabled}>
      <KeyboardArrowLeft className={styles.icon} size={16} />
    </button>
  )
}

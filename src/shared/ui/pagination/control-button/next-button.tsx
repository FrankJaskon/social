import styles from './prev-button.module.scss'

import KeyboardArrowRight from '@/shared/assets/icons/keyboard-arrow-right'

type NavigationButtonProps = {
  onClick: () => void
  disabled?: boolean
}
export const NextButton = ({ onClick, disabled }: NavigationButtonProps) => {
  return (
    <button className={styles.item} onClick={onClick} disabled={disabled}>
      <KeyboardArrowRight className={styles.icon} size={16} />
    </button>
  )
}

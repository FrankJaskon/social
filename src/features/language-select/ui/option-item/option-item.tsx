import cls from './option-item.module.scss'

import { Typography } from '@/shared/ui/typography'

export interface OptionItemProps {
  icon: JSX.Element
  label: string
}

export const OptionItem: React.FC<OptionItemProps> = props => {
  const { icon, label } = props

  return (
    <div className={cls.flexContainer}>
      {icon}
      <Typography variant="regular_16" className={cls.label}>
        {label}
      </Typography>
    </div>
  )
}

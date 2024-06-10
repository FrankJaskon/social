import cls from './blank.module.scss'

export interface BlankProps {
  width?: number
  height?: number
}

export const Blank: React.FC<BlankProps> = props => {
  const { width = 24, height = 24 } = props

  return <div className={cls.blank} style={{ width, height }} />
}

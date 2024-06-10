import clsx from 'clsx'

import cls from './loader.module.scss'

export interface LoaderProps {
  className?: string
}

export const Loader: React.FC<LoaderProps> = props => {
  const { className } = props

  return <span className={clsx(cls.loader, className)}></span>
}

import clsx from 'clsx'

import cls from './page-loader.module.scss'

import { Loader } from '@/shared/ui/loader'

export interface PageLoaderProps {
  className?: string
}

export const PageLoader: React.FC<PageLoaderProps> = props => {
  const { className } = props

  return (
    <div className={clsx(cls.loaderContainer, className)}>
      <Loader className={cls.loader} />
    </div>
  )
}

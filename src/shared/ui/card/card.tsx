import { FC, ReactNode, useMemo } from 'react'

import clsx from 'clsx'

import cls from './card.module.scss'

export type PaddingBottomType = 'small' | 'medium' | 'big'

export interface CardProps {
  className?: string
  variant?: 'primary' | 'custom' | 'notification'
  width?: 'full' | 'small' | 'medium' | 'big' | 'huge'
  align?: 'start' | 'center' | 'end'
  children: ReactNode
  pBottom?: PaddingBottomType
}

const pBottomMapper: Record<PaddingBottomType, string> = {
  small: 'pBottomSmall',
  medium: 'pBottomMedium',
  big: 'pBottomBig',
} as const

export const Card: FC<CardProps> = props => {
  const {
    className,
    children,
    variant = 'primary',
    width = 'full',
    align = 'start',
    pBottom = 'medium',
  } = props

  const extra = useMemo(
    () => [className, cls[variant], cls[width], cls[align], cls[pBottomMapper[pBottom]]],
    [className, variant, width, align, pBottom]
  )

  return <div className={clsx(cls.card, extra)}>{children}</div>
}

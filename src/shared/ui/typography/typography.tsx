import { ComponentPropsWithoutRef, ElementType, useMemo } from 'react'

import clsx from 'clsx'

import cls from './typography.module.scss'

type AlignType = 'start' | 'center' | 'end' | 'justify'

const AlignMapper: Record<AlignType, string> = {
  start: 'alignStart',
  center: 'alignCenter',
  end: 'alignEnd',
  justify: 'alignJustify',
} as const

export type TypographyProps<T extends ElementType = 'p'> = {
  as?: T
  color?: 'primary' | 'secondary' | 'inherit' | 'error' | 'tip'
  variant?:
    | 'large'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'regular_16'
    | 'bold_16'
    | 'regular_14'
    | 'medium_14'
    | 'semi-bold-small'
    | 'small_text'
    | 'bold_14'
    | 'link1'
    | 'link2'
    | 'error'
  className?: string
  align?: AlignType
  clickable?: boolean
} & ComponentPropsWithoutRef<T>

export const Typography = <T extends ElementType = 'p'>(
  props: TypographyProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TypographyProps<T>>
) => {
  const {
    variant = 'regular_14',
    align = 'start',
    color = 'secondary',
    className,
    as: Component = 'p',
    clickable = false,
    ...rest
  } = props

  const mods = useMemo(
    () => ({
      [cls.hovered]: clickable,
      [cls[color]]: Boolean(color),
      [cls[AlignMapper[align]]]: Boolean(align),
    }),
    [align, clickable, color]
  )

  const extra = useMemo(() => [className, cls[variant]], [className, variant])

  const classNames = useMemo(() => clsx(cls.link, mods, extra), [extra, mods])

  return <Component className={classNames} {...rest} />
}

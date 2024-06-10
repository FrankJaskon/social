import { ComponentPropsWithoutRef, ElementType } from 'react'

import { clsx } from 'clsx'
import Link from 'next/link'

import cls from './button.module.scss'

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  variant?: 'primary' | 'secondary' | 'outlined' | 'link' | 'custom'
  fullWidth?: boolean
  className?: string
  activeClassName?: string
  currentPathname?: string
} & ComponentPropsWithoutRef<T>
export const Button = <T extends ElementType = 'button'>(
  props: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>
) => {
  const {
    variant = 'primary',
    currentPathname,
    href,
    activeClassName,
    fullWidth,
    className,
    as: Component = 'button',
    ...rest
  } = props

  const isActive = currentPathname === href
  const classNames = clsx(
    cls.button,
    cls[variant],
    fullWidth && cls.fullWidth,
    className,
    isActive && activeClassName
  )

  if (Component === 'a' || variant === 'link') {
    return <Link href={href} passHref className={classNames} {...rest} />
  }

  return <Component className={classNames} {...rest} />
}

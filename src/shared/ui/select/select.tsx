import { CSSProperties, FC, ReactElement } from 'react'

import * as SelectRadix from '@radix-ui/react-select'
import { clsx } from 'clsx'
import { Inter } from 'next/font/google'

import { Typography } from '../typography'

import cls from './select.module.scss'

import { ArrowDownIcon } from '@/shared/assets/icons/arrow-down'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export type Option = { label: string | ReactElement; value: string }

type ConditionalMultipleProps = {
  multiple?: true
  value: string | ReactElement
  onChange: (value: string) => void
}

type CommonProps = {
  className?: string
  disabled?: boolean
  secondary?: boolean
  name?: string
  placeholder?: string | ReactElement
  required?: boolean
  variant?: 'primary' | 'pagination'
  options: Array<Option>
  portal?: boolean
  errorMessage?: string
  label?: string
  width?: CSSProperties['width']
  rootClassName?: string
}
export type SelectProps = CommonProps & ConditionalMultipleProps

export const Select: FC<SelectProps> = ({
  variant = 'primary',
  placeholder,
  value,
  disabled,
  className,
  onChange,
  secondary,
  errorMessage,
  options,
  label,
  rootClassName,
  width,
}) => {
  const showError = !!errorMessage && errorMessage.length > 0
  const classNames = {
    root: rootClassName,
    trigger: clsx(
      cls.trigger,
      cls[variant],
      showError && cls.error,
      secondary && cls.secondary,
      className
    ),
    icon: clsx(cls.icon, cls[variant]),
    item: clsx(cls.item, cls[variant]),
    content: clsx(cls.content, cls[variant]),
    label: clsx(cls.label, disabled && cls.disabled),
  }
  const withoutPlaceholder = variant === 'pagination' ? value : 'Select Box'
  const rootStyles = { width }

  return (
    <div className={classNames.root}>
      <Typography variant={'regular_16'} as="label" className={classNames.label}>
        {label}
      </Typography>
      <SelectRadix.Root disabled={disabled} onValueChange={onChange}>
        <SelectRadix.Trigger className={classNames.trigger} style={rootStyles}>
          <SelectRadix.Value placeholder={placeholder || withoutPlaceholder}>
            {value}
          </SelectRadix.Value>
          <SelectRadix.Icon className={classNames.icon}>
            <ArrowDownIcon size={variant === 'pagination' ? 16 : 24} />
          </SelectRadix.Icon>
        </SelectRadix.Trigger>
        <SelectRadix.Portal>
          <SelectRadix.Content
            className={clsx(classNames.content, inter.className)}
            position={'popper'}
          >
            {options.map(option => (
              <SelectRadix.Item value={option.value} className={classNames.item} key={option.value}>
                <Typography as="span" className={cls.active} color="secondary">
                  {option.label}
                </Typography>
              </SelectRadix.Item>
            ))}
          </SelectRadix.Content>
        </SelectRadix.Portal>
        {showError && <Typography variant={'error'}>{errorMessage}</Typography>}
      </SelectRadix.Root>
    </div>
  )
}

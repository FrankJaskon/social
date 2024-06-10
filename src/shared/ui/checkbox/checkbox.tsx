import * as CheckboxRadix from '@radix-ui/react-checkbox'
import * as LabelRadix from '@radix-ui/react-label'
import { clsx } from 'clsx'

import { Typography } from '../typography'

import cls from './checkbox.module.scss'

import { Check } from '@/shared/assets/icons/check'

export type CheckboxProps = {
  className?: string
  checked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  required?: boolean
  label?: string
  id?: string
  position?: 'left'
  errorMessage?: string
}

export const CheckboxItem = ({
  checked,
  onChange,
  disabled,
  required,
  position,
  className,
  label,
  id,
  errorMessage,
}: CheckboxProps) => {
  const classNames = {
    container: clsx(cls.container, className),
    buttonWrapper: clsx(
      cls.buttonWrapper,
      disabled && cls.disabled,
      position === 'left' && cls.left
    ),
    root: cls.root,
    indicator: cls.indicator,
    label: clsx(cls.label, disabled && cls.disabled),
  }

  return (
    <div style={{ position: 'relative' }}>
      <div className={classNames.container}>
        <LabelRadix.Root asChild>
          <Typography className={cls.wrap} as={'label'} variant="regular_14">
            <div className={classNames.buttonWrapper}>
              <CheckboxRadix.Root
                className={classNames.root}
                checked={checked}
                onCheckedChange={onChange}
                disabled={disabled}
                required={required}
                id={id}
              >
                {checked && (
                  <CheckboxRadix.Indicator className={classNames.indicator} forceMount>
                    <Check disabled={disabled ? disabled : false} />
                  </CheckboxRadix.Indicator>
                )}
              </CheckboxRadix.Root>
            </div>
            {label}
          </Typography>
        </LabelRadix.Root>
      </div>
      {errorMessage && (
        <Typography color="error" variant="regular_14" className={cls.errorMessage}>
          {errorMessage}
        </Typography>
      )}
    </div>
  )
}

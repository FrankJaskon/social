import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  HTMLInputTypeAttribute,
  MouseEvent,
  forwardRef,
  useCallback,
  useState,
} from 'react'

import { clsx } from 'clsx'

import { Typography } from '../typography'

import cls from './input.module.scss'

import { Eye } from '@/shared/assets/icons/eye'
import { EyeClosed } from '@/shared/assets/icons/eye-closed'
import { SearchIcon } from '@/shared/assets/icons/search-icon'

export type InputPropsType = {
  label?: string
  inputTextClassName?: string
  error?: string
  searchInput?: boolean
  width?: string
  callback?: () => void
} & ComponentPropsWithoutRef<'input'>

const getPlaceholderByType = (type?: HTMLInputTypeAttribute) => {
  const mapper: OptionalRecord<HTMLInputTypeAttribute, string> = {
    email: 'Epam@epam.com',
    password: '******************',
  }

  return (type && mapper[type]) ?? ''
}

export const Input = forwardRef<HTMLInputElement, InputPropsType>(
  (
    {
      className,
      error,
      inputTextClassName,
      searchInput,
      value = '',
      placeholder,
      disabled,
      onChange,
      type,
      width,
      label,
      callback,
      ...restProps
    },
    ref
  ) => {
    const [iconVisible, setIconVisible] = useState(type)
    const [currentPlaceholder, setCurrentPlaceholder] = useState(
      placeholder ?? getPlaceholderByType(type)
    )

    const classNames = {
      input: clsx(cls.inputContainer, !!error && cls.error, className),
      label: clsx(cls.inputContainer, !!error && cls.error, className),
      inpText: clsx(cls.input, inputTextClassName),
    }

    const handleIconClickDown = useCallback((e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      setCurrentPlaceholder('')
      setIconVisible(() => 'text')
    }, [])

    const handleIconClickUp = useCallback((e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      setCurrentPlaceholder(placeholder ?? getPlaceholderByType(type))
      setIconVisible(() => 'password')
    }, [])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
      callback?.()
    }

    return (
      <div className={clsx(cls.main, disabled && cls.disabled)} style={{ width }}>
        {label && (
          <div>
            <Typography className={cls.label} variant="regular_14">
              {label}
            </Typography>
          </div>
        )}
        <div className={classNames.input}>
          {searchInput && (
            <span
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              className={cls.icon}
            >
              <SearchIcon />
            </span>
          )}
          <input
            ref={ref}
            disabled={disabled}
            className={classNames.inpText}
            placeholder={currentPlaceholder}
            value={value}
            type={iconVisible}
            onChange={handleChange}
            {...restProps}
          />
          {(type === 'password' || iconVisible === 'password') && (
            <button
              disabled={disabled}
              className={cls.fakebutton}
              onMouseDown={handleIconClickDown}
              onMouseUp={handleIconClickUp}
              onMouseOut={handleIconClickUp}
            >
              {iconVisible === 'password' ? (
                <Eye color={disabled ? 'var(--dark-100)' : ''} />
              ) : (
                <EyeClosed color={disabled ? 'var(--dark-100)' : ''} />
              )}
            </button>
          )}
        </div>
        <div className={cls.errorContainer}>
          {error && (
            <div style={{ margin: '4px 0' }}>
              <Typography color="error" variant="small_text">
                {error}
              </Typography>
            </div>
          )}
        </div>
      </div>
    )
  }
)

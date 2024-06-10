import { memo } from 'react'

import clsx from 'clsx'

import { Typography } from '../typography'

import cls from './form-error.module.scss'

import { getTranslationByKey } from '@/shared/helpers/get-translation-by-key'
import { useTranslation } from '@/shared/hooks/use-translation'

export interface FormErrorProps {
  error?: string
  className?: string
}

export const FormError: React.FC<FormErrorProps> = memo((props: FormErrorProps) => {
  const { error, className } = props
  const { t } = useTranslation()

  if (!error) return null

  const errorMessage = getTranslationByKey<typeof t.errors>({
    translationObj: t.errors,
    key: error,
  })

  return (
    <div className={clsx(cls.errorContainer, className)}>
      <Typography color="error" variant="small_text" className={cls.errorField}>
        {errorMessage}
      </Typography>
    </div>
  )
})

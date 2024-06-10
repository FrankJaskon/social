import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

import { Input } from '../../input'

import { getTranslationByKey } from '@/shared/helpers/get-translation-by-key'
import { useTranslation } from '@/shared/hooks/use-translation'
import { InputPropsType } from '@/shared/ui/input/input'

type Props<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>
} & Omit<InputPropsType, 'onChange' | 'value'>

export const ControlledInput = <T extends FieldValues>(props: Props<T>) => {
  const { control, name, className, error: customError, ...rest } = props
  const {
    field,
    fieldState: { error },
  } = useController({ name, control })
  const { t } = useTranslation()

  const errorMessage = getTranslationByKey<typeof t.errors>({
    translationObj: t.errors,
    key: customError ?? error?.message,
  })

  return <Input error={errorMessage} className={className} {...field} {...rest} />
}

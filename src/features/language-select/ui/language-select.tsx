import { memo, useState } from 'react'

import { useRouter } from 'next/router'

import { getSelectOptions, selectHeaders } from '../model/consts/options'

import cls from './language-select.module.scss'

import { defaultLocale } from '@/shared/consts/global'
import { useTranslation } from '@/shared/hooks/use-translation'
import { LocaleNameType } from '@/shared/types/general'
import { Select } from '@/shared/ui/select'

export const LanguageSelect = memo(() => {
  const { locale, push, pathname, query, asPath } = useRouter()
  const { t } = useTranslation()
  const [value, setValue] = useState<LocaleNameType>((locale as LocaleNameType) ?? defaultLocale)
  const options = getSelectOptions(t)
  const isEnglish = value === 'en'

  const changeLangHandler = (value: string) => {
    const locale = value as LocaleNameType

    push({ pathname, query }, asPath, { locale })
    setValue(locale)
  }

  return (
    <Select
      placeholder={isEnglish ? selectHeaders.en : selectHeaders.ru}
      onChange={changeLangHandler}
      value={selectHeaders[value]}
      options={Object.values(options)}
      rootClassName={cls.languageSelect}
      className={cls.trigger}
    />
  )
})

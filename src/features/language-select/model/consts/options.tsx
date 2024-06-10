import { OptionItem } from '../../ui/option-item/option-item'
import { OptionItemProps } from '../types/select'

import { KingdomIcon } from '@/shared/assets/icons/kingdom'
import { RussiaIcon } from '@/shared/assets/icons/russia'

interface Translation {
  english: string
  russian: string
}

interface GetSelectOptionsReturned {
  en: OptionItemProps
  ru: OptionItemProps
}

export const getSelectOptions = (t: Translation): GetSelectOptionsReturned => ({
  en: { value: 'en', label: <OptionItem icon={<KingdomIcon />} label={t.english} /> },
  ru: { value: 'ru', label: <OptionItem icon={<RussiaIcon />} label={t.russian} /> },
})

export const selectHeaders = {
  en: <OptionItem icon={<KingdomIcon />} label="English" />,
  ru: <OptionItem icon={<RussiaIcon />} label="Русский" />,
}

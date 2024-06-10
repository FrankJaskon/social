import { ArrowDownIcon } from '@/shared/assets/icons/arrow-down'
import { Check } from '@/shared/assets/icons/check'
import { Eye } from '@/shared/assets/icons/eye'
import { EyeClosed } from '@/shared/assets/icons/eye-closed'
import { KeyboardArrowLeft } from '@/shared/assets/icons/keyboard-arrow-left'
import KeyboardArrowRight from '@/shared/assets/icons/keyboard-arrow-right'
import { LogOutIcon } from '@/shared/assets/icons/log-out-icon'
import { SearchIcon } from '@/shared/assets/icons/search-icon'

const meta = {
  title: 'Icons/General',
  component: Check,
  tags: ['autodocs'],
}

export default meta
export const AllIcons = {
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Check />
        <ArrowDownIcon />
        <Eye />
        <EyeClosed />
        <KeyboardArrowLeft />
        <KeyboardArrowRight />
        <LogOutIcon />
        <SearchIcon />
      </div>
    )
  },
}

import { clsx } from 'clsx'

import { Typography } from '../../typography'

import cls from './page-button.module.scss'

type PageButtonProps = {
  onClick: () => void
  disabled?: boolean
  page: number
  selected: boolean
}

export const PageButton = ({ onClick, disabled, selected, page }: PageButtonProps) => {
  const classNames = {
    item: cls.item,
    pageButton(selected?: boolean) {
      return clsx(this.item, selected && cls.selected)
    },
  }

  return (
    <button
      onClick={onClick}
      disabled={selected || disabled}
      className={classNames.pageButton(selected)}
    >
      <Typography className={cls.text} variant="regular_14">
        {page}
      </Typography>
    </button>
  )
}

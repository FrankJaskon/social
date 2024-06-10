import cls from './main-pagination-buttons.module.scss'

import { PageButton } from '@/shared/ui/pagination/page-button/page-button'

type MainPaginationButtonsProps = {
  paginationRange: (number | string)[]
  currentPage: number
  onClick: (pageNumber: number) => () => void
}

export const MainPaginationButtons = ({
  paginationRange,
  currentPage,
  onClick,
}: MainPaginationButtonsProps) => {
  return (
    <>
      {paginationRange.map((page: number | string, index) => {
        const isSelected = page === currentPage

        if (typeof page !== 'number') {
          return (
            <span key={index} className={cls.dots}>
              &#8230;
            </span>
          )
        }

        return <PageButton key={index} page={page} selected={isSelected} onClick={onClick(page)} />
      })}
    </>
  )
}

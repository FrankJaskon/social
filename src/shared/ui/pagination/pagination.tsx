import { memo } from 'react'

import cls from './pagination.module.scss'

import { usePagination } from '@/shared/hooks/use-pagination'
import { NextButton } from '@/shared/ui/pagination/control-button/next-button'
import { PrevButton } from '@/shared/ui/pagination/control-button/prev-button'
import { MainPaginationButtons } from '@/shared/ui/pagination/main-pagination-buttons/main-pagination-buttons'
import { PerPageSelect } from '@/shared/ui/pagination/per-page-select/per-page-select'

type PaginationPropsType = {
  count: number
  page: number
  onChange: (page: number) => void
  siblings?: number
  perPage?: number // no perPage, no select
  perPageOptions?: number[] // array points in elect
  onPerPageChange?: (itemPerPage: string) => void // change from number
}

export const Pagination = memo(
  ({
    count,
    page,
    perPage,
    onChange,
    siblings,
    perPageOptions,
    onPerPageChange,
  }: PaginationPropsType) => {
    const {
      paginationRange,
      isLastPage,
      isFirstPage,
      handlePreviousPageClicked,
      handleNextPageClicked,
      handleMainPageClicked,
    } = usePagination({
      page,
      count,
      onChange,
      siblings,
    })
    const showPerPageSelect = !!perPage && !!perPageOptions && !!onPerPageChange

    return (
      <div className={cls.main}>
        <div className={cls.numbers}>
          <PrevButton onClick={handlePreviousPageClicked} disabled={isFirstPage} />
          <MainPaginationButtons
            currentPage={page}
            onClick={handleMainPageClicked}
            paginationRange={paginationRange}
          />
          <NextButton onClick={handleNextPageClicked} disabled={isLastPage} />
        </div>
        {showPerPageSelect && (
          <PerPageSelect
            {...{
              perPage,
              perPageOptions,
              onPerPageChange,
            }}
          />
        )}
      </div>
    )
  }
)

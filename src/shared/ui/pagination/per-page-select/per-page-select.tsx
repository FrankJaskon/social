import { Select } from '../../select'

import cls from './per-page-select.module.scss'

export type PerPageSelectProps = {
  perPage: number
  perPageOptions: number[]
  onPerPageChange: (itemPerPage: string) => void
}

export const PerPageSelect = ({ perPage, perPageOptions, onPerPageChange }: PerPageSelectProps) => {
  const selectOptions = perPageOptions.map(value => ({
    label: value.toString(),
    value: value.toString(),
  }))

  return (
    <div className={cls.selectBox}>
      {'show'}
      <Select
        className={cls.select}
        value={perPage.toString()}
        options={selectOptions}
        onChange={onPerPageChange}
        variant="pagination"
      />
      {'On page'}
    </div>
  )
}

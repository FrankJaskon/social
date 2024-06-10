import { useState } from 'react'

import type { Meta } from '@storybook/react'
import { StoryObj } from '@storybook/react'

import { Select, SelectProps } from './select'

import meta from '@/shared/ui/input/input.stories'

export default {
  title: 'shared/Select',
  component: Select,
  tags: ['autodocs'],
} satisfies Meta<typeof Select>
type Story = StoryObj<typeof meta>

const optionsPrimary = [
  {
    value: 'apple',
    label: 'Apple',
  },
  {
    value: 'banana',
    label: 'Banana',
  },
  {
    value: 'blueberry',
    label: 'Blueberry',
  },
  {
    value: 'grapes',
    label: 'Grapes',
  },
]
const optionsPagination = [
  {
    value: '1',
    label: '1',
  },
  {
    value: '2',
    label: '2',
  },
  {
    value: '3',
    label: '3',
  },
  {
    value: '4',
    label: '4',
  },
]

const SimpleSelect = (args: SelectProps) => {
  const [value, setValue] = useState('')

  return <Select {...args} value={value} onChange={setValue} />
}

export const SimpleSelectStory: Story = {
  render: () => <SimpleSelect value="" onChange={() => {}} options={optionsPrimary} />,
}

export const SimpleSelectDisabledStory: Story = {
  render: () => (
    <SimpleSelect disabled={true} value="" onChange={() => {}} options={optionsPrimary} />
  ),
}

const SimpleWithLabel = (args: SelectProps) => {
  const [value, setValue] = useState('')

  return <Select {...args} value={value} onChange={setValue} />
}

export const SimpleWithLabelStory: Story = {
  render: () => <SimpleWithLabel value="" onChange={() => {}} options={optionsPrimary} />,
}

const Error = (args: SelectProps) => {
  const { value: mockValue, onChange, ...restProps } = args
  const [value, setValue] = useState('')

  return <Select {...restProps} value={value} onChange={setValue} />
}

export const ErrorStory: Story = {
  render: () => <Error value="" onChange={() => {}} options={optionsPrimary} />,
}

const PaginationSelect = (args: SelectProps) => {
  const [value, setValue] = useState('')

  return <Select {...args} value={value} onChange={setValue} />
}

export const PaginationSelectStory: Story = {
  render: () => <PaginationSelect value="" onChange={() => {}} options={optionsPrimary} />,
}

const FullWidth = (args: SelectProps) => {
  const [value, setValue] = useState('')

  return (
    <Select
      label="pagination"
      placeholder="1"
      variant="pagination"
      {...args}
      value={value}
      onChange={setValue}
    />
  )
}

export const FullWidthStory: Story = {
  render: () => (
    <FullWidth
      width={'100%'}
      variant="primary"
      value=""
      onChange={() => {}}
      options={optionsPrimary}
    />
  ),
}

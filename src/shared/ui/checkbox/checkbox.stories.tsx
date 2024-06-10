import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { CheckboxItem } from './checkbox'

const meta = {
  title: 'shared/Checkbox',
  component: CheckboxItem,
  tags: ['autodocs'],
  argTypes: {
    label: [''],
  },
} satisfies Meta<typeof CheckboxItem>

export default meta
type Story = StoryObj<typeof meta>

export const Main: Story = {
  args: { label: 'Click me' },
}

const CheckboxControlled = () => {
  const [value, setValue] = useState(true)
  const onChange = (value: boolean) => {
    setValue(value)
  }

  return <CheckboxItem checked={value} onChange={onChange} />
}

export const CheckboxControlledStory: Story = {
  render: () => <CheckboxControlled />,
}

const CheckboxControlledWithLabel = () => {
  const [value, setValue] = useState(true)
  const onChange = (value: boolean) => {
    setValue(value)
  }

  return (
    <CheckboxItem
      errorMessage="Error message"
      label="Click me"
      checked={value}
      onChange={onChange}
    />
  )
}

export const CheckboxControlledWithLabelStory: Story = {
  render: () => <CheckboxControlledWithLabel />,
}

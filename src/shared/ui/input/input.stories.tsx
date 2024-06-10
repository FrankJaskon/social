import { ChangeEvent, useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Input } from './input'

const meta = {
  title: 'shared/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      options: ['text', 'password'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const MainInput: Story = {
  args: {
    value: 'Simple input',
    label: 'Click here',
    disabled: false,
  },
}

export const InputWithPlaceHolder: Story = {
  args: {
    label: 'Click here',
    disabled: false,
    placeholder: 'Type Something',
  },
}

const InputPassword = () => {
  const [value, setValue] = useState('')
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)
  }

  return <Input type="password" label="Click here" value={value} onChange={onChange} />
}

export const Password: Story = {
  render: () => <InputPassword />,
}

const InputWithPlaceHolderAndSearch = () => {
  const [value, setValue] = useState('')
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)
  }

  return <Input searchInput={true} placeholder={'Placeholder'} onChange={onChange} value={value} />
}

export const InputPlaceHolderAndSearch: Story = {
  render: () => <InputWithPlaceHolderAndSearch />,
}

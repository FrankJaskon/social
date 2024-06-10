import type { Meta, StoryObj } from '@storybook/react'

import { Card } from './card'

const meta = {
  title: 'shared/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['primary', 'custom', 'notification'],
      control: { type: 'radio' },
    },
    width: {
      options: ['full', 'small', 'medium', 'big'],
      control: { type: 'radio' },
    },
    align: {
      options: ['left', 'center', 'right'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: <div>Some text</div>,
  },
}
export const Notification: Story = {
  args: {
    variant: 'notification',
    children: <div>Some text</div>,
  },
}
export const Custom: Story = {
  args: {
    variant: 'custom',
    children: <div>Some text</div>,
  },
}
export const SmallWidth: Story = {
  args: {
    width: 'small',
    children: <div>Some text</div>,
  },
}
export const MediumWidth: Story = {
  args: {
    width: 'medium',
    children: <div>Some text</div>,
  },
}
export const BigWidth: Story = {
  args: {
    width: 'big',
    children: <div>Some text</div>,
  },
}
export const AlignLeft: Story = {
  args: {
    align: 'start',
    children: <div>Some text</div>,
  },
}
export const AlignCenter: Story = {
  args: {
    align: 'center',
    children: <div>Some text</div>,
  },
}
export const AlignRight: Story = {
  args: {
    align: 'end',
    children: <div>Some text</div>,
  },
}

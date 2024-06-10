import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from './typography'

const meta = {
  title: 'shared/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: [
        'large',
        'regular_16',
        'bold_16',
        'regular_14',
        'medium_14',
        'semi-bold-small',
        'link1',
        'link2',
      ],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const Large: Story = {
  args: {
    variant: 'large',
    children: 'Large',
  },
}

export const Bold_16: Story = {
  args: {
    variant: 'bold_16',
    children: 'bold_16',
    disabled: false,
  },
}

export const Regular_16: Story = {
  args: {
    variant: 'regular_16',
    children: 'regular_16 Checkbox',
  },
}
export const Regular_14: Story = {
  args: {
    variant: 'regular_14',
    children: 'Regular_14 Checkbox',
  },
}
export const Medium_14: Story = {
  args: {
    variant: 'medium_14',
    children: 'medium_14 Checkbox',
  },
}

export const SemiBoldSmall: Story = {
  args: {
    variant: 'semi-bold-small',
    children: 'semi-bold-small',
  },
}
export const Link1: Story = {
  args: {
    variant: 'link1',
    children: 'Link1 Checkbox',
  },
}
export const Link2: Story = {
  args: {
    variant: 'link2',
    children: 'Link2 Checkbox',
  },
}

export const AsH1: Story = {
  args: {
    children: 'Looks like a H1',
    as: 'h1',
  },
}
export const AsH2: Story = {
  args: {
    children: 'Looks like a H2',
    as: 'h2',
  },
}
export const AsH3: Story = {
  args: {
    children: 'Looks like a H3',
    as: 'h3',
  },
}
export const AsP: Story = {
  args: {
    children: 'Looks like a paragraph',
    as: 'p',
  },
}

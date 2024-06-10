import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Button } from './button'
import cls from './button.module.scss'

import { Check } from '@/shared/assets/icons/check'
import { getLoginRoute } from '@/shared/consts/route-paths'
import { Typography } from '@/shared/ui/typography'

const meta = {
  title: 'shared/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'outlined', 'link'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
    disabled: false,
  },
}
export const PrimaryWithTypography: Story = {
  args: {
    variant: 'primary',
    children: (
      <Typography color="inherit" variant="medium_14">
        Button Primary
      </Typography>
    ),
    disabled: false,
  },
}

export const PrimaryWithChildren: Story = {
  args: {
    variant: 'primary',
    children: (
      <>
        <Check />
        Primary Button
      </>
    ),
    disabled: false,
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
    disabled: false,
  },
}
export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: 'Outlined Button',
    disabled: false,
  },
}
export const Link: Story = {
  args: {
    href: 'gggg',
    variant: 'link',
    children: (
      <>
        <Button variant="link" href={getLoginRoute()} as="a">
          <Typography color="inherit" variant="h3">
            Sign In
          </Typography>
        </Button>
      </>
    ),
    disabled: false,
  },
}

export const FullWidth: Story = {
  args: {
    variant: 'primary',
    children: 'Full Width Button',
    disabled: false,
    fullWidth: true,
  },
}

export const Disabled: Story = {
  args: {
    variant: 'primary',
    children: 'Disabled',
    disabled: true,
  },
}

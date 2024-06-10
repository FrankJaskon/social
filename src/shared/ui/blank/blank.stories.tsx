import { Meta, StoryFn } from '@storybook/react'

import { Blank, BlankProps } from './blank'

export default {
  title: 'shared/Blank',
  component: Blank,
  argTypes: {},
} as Meta<typeof Blank>

const Template: StoryFn<typeof Blank> = args => <Blank {...args} />

export const Default: StoryFn<BlankProps> = Template.bind({})
Default.args = {}

export const WithSizes: StoryFn<BlankProps> = Template.bind({})
Default.args = {
  width: 200,
  height: 50,
}

import type { Preview } from '@storybook/react'
import '@/app/styles/index.scss'

import { StoreDecorator } from '../src/shared/lib/storybook/decorators/store-decorator'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [StoreDecorator({})],
}

export default preview

import { DeepPartial } from '@reduxjs/toolkit'
import { StoryFn } from '@storybook/react'

import { StateSchema, StoreProvider } from '@/app/providers/store-provider/testing'

export const StoreDecorator = (state: DeepPartial<StateSchema>) => (StoryComponent: StoryFn) => (
  <StoreProvider initialState={state as StateSchema}>
    <StoryComponent />
  </StoreProvider>
)

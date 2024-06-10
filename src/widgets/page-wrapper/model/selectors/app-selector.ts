import { buildSelector } from '@/shared/lib/store'

export const [useGetInitialized] = buildSelector(state => state.app._initialized)

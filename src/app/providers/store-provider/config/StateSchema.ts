import { AuthScheme } from '@/features/auth'
import { rtkApi } from '@/shared/api/rtk-api'
import { AppScheme } from '@/widgets/page-wrapper'

export interface StateSchema {
  app: AppScheme
  auth: AuthScheme
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>
}

export type StateSchemaKey = keyof StateSchema

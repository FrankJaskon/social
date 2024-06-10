import { buildSelector } from '@/shared/lib/store'

export const [useGetAccessToken, getAccessToken] = buildSelector(state => state?.auth?.accessToken)
export const [useGetUserAuthorized, getUserAuthorized] = buildSelector(state =>
  Boolean(state?.auth?.accessToken)
)
export const [useGetUserData, getUserData] = buildSelector(state => state?.auth?.user)

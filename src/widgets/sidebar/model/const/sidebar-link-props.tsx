import { SidebarItemType } from '../types/sidebar-link'

import {
  getCreateRoute,
  getFavoritesRoute,
  getHomeRoute,
  getMessengerRoute,
  getProfileRoute,
  getSearchRoute,
  getStatisticRoute,
} from '@/shared/consts/route-paths'
import { Blank } from '@/shared/ui/blank'

export const sidebarLinkList: SidebarItemType[][] = [
  [
    {
      path: getHomeRoute(),
      text: 'home',
      Icon: Blank,
      authOnly: true,
    },
    {
      path: getCreateRoute(),
      text: 'create',
      Icon: Blank,
      authOnly: true,
    },
    {
      path: getProfileRoute(),
      text: 'myProfile',
      Icon: Blank,
      authOnly: true,
    },
    {
      path: getMessengerRoute(),
      text: 'messenger',
      Icon: Blank,
      authOnly: true,
    },
    {
      path: getSearchRoute(),
      text: 'search',
      Icon: Blank,
      authOnly: true,
    },
  ],
  [
    {
      path: getFavoritesRoute(),
      text: 'favorites',
      Icon: Blank,
      authOnly: true,
    },
    {
      path: getStatisticRoute(),
      text: 'statistic',
      Icon: Blank,
      authOnly: true,
    },
  ],
]

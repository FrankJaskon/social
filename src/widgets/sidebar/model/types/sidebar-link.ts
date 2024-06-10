export interface SidebarItemType {
  path: string
  Icon: any
  text: string
  authOnly?: boolean
}

export type SidebarLinkText =
  | 'home'
  | 'create'
  | 'myProfile'
  | 'messenger'
  | 'search'
  | 'favorites'
  | 'statistic'

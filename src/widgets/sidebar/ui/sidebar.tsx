import { sidebarLinkList } from '../model/const/sidebar-link-props'

import { SidebarLinkGroup } from './sidebar-link-group/sidebar-link-group'
import cls from './sidebar.module.scss'

import { LogoutButton } from '@/features/auth'

export const Sidebar = () => {
  return (
    <aside className={cls.sidebar}>
      {sidebarLinkList.map((linkGroup, index) => (
        <SidebarLinkGroup linkGroup={linkGroup} key={index} />
      ))}
      <div className={cls.sidebarFooter}>
        <LogoutButton />
      </div>
    </aside>
  )
}

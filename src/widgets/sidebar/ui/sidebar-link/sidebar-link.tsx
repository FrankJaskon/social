import { SidebarItemType } from '../../model/types/sidebar-link'

import cls from './sidebar-link.module.scss'

import { ActiveLink } from '@/shared/ui/active-link'

export const SidebarLink: React.FC<SidebarItemType> = props => {
  const { path, text, Icon } = props

  return (
    <div className={cls.flexWrapper}>
      <Icon />
      <ActiveLink href={path}>{text}</ActiveLink>
    </div>
  )
}

import { SidebarItemType, SidebarLinkText } from '../../model/types/sidebar-link'
import { SidebarLink } from '../sidebar-link/sidebar-link'

import cls from './sidebar-link-group.module.scss'

import { useTranslation } from '@/shared/hooks/use-translation'

interface SidebarLinkGroupProps {
  linkGroup: SidebarItemType[]
}

export const SidebarLinkGroup: React.FC<SidebarLinkGroupProps> = props => {
  const { linkGroup } = props
  const { t } = useTranslation()

  return (
    <div className={cls.sidebarLinkGroup}>
      {linkGroup.map(({ text, ...rest }) => (
        <SidebarLink key={text} {...rest} text={t.sidebar.links[text as SidebarLinkText]} />
      ))}
    </div>
  )
}

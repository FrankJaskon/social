import cls from './header.module.scss'

import { LanguageSelect } from '@/features/language-select'
import { getHomeRoute } from '@/shared/consts/route-paths'

export const Header = () => {
  return (
    <header className={cls.header}>
      <a className={cls.appLogo} href={getHomeRoute()}>
        Inctagram
      </a>
      <div className={cls.menuContainer}>
        <LanguageSelect />
      </div>
    </header>
  )
}

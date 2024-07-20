import { createElement as h } from 'react'
import type { ReactNode } from 'react'

import {
  FaSolidCircle,
  FaSolidCircleNotch,
  FaSolidComments,
  FaSolidDotCircle,
  FaSolidFeatherAlt,
  FaSolidHistory,
  FaSolidUserFriends,
  IcTwotoneSignpost,
  IonBook,
  MdiFlask,
  MdiLightbulbOn20,
  RMixPlanet,
} from '~/components/icons/menu-collection'

export interface IHeaderMenu {
  title: string
  path: string
  type?: string
  icon?: ReactNode
  subMenu?: Omit<IHeaderMenu, 'exclude'>[]
  exclude?: string[]
}
export const headerMenuConfig: IHeaderMenu[] = [
  {
    title: '首页',
    path: '/',
    type: 'Home',
    icon: h(FaSolidDotCircle),
  },
  {
    title: '文章',
    path: '/posts',
    type: 'Post',
    icon: h(IcTwotoneSignpost),
  },
  {
    title: '项目',
    icon: h(MdiFlask),
    path: '/projects',
  },
  // {
  //   title: '友链',
  //   icon: h(FaSolidUserFriends),
  //   path: '/friends',
  // },
]

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { OnlyDesktop } from '~/components/ui/viewport'
import { clsxm } from '~/lib/helper'

import styles from './grid.module.css'
import Signature from './Signature'

export const HeaderLogoArea: Component = ({ children }) => {
  return (
    <div className={clsxm('relative', styles['header--grid__logo'])}>
      <div
        className={clsxm('relative flex size-full items-center justify-center')}
      >
        {children}
      </div>
    </div>
  )
}

export const HeaderLeftButtonArea: Component = ({ children }) => {
  return (
    <div
      className={clsxm(
        'relative flex size-full items-center justify-center lg:hidden',
      )}
    >
      {children}
    </div>
  )
}

export const HeaderCenterArea: Component = ({ children }) => {
  const pathname = usePathname()
  return (
    <OnlyDesktop>
      <div className="flex min-w-0 grow">
        <div
          className={clsxm(
            'relative flex grow items-center',
            pathname === '/' ? 'justify-end' : 'justify-between',
          )}
        >
          {pathname !== '/' ? (
            <Link
              href={'/'}
              className={clsxm('z-50 text-2xl font-medium italic', {
                'text-white': pathname === '/',
              })}
            >
              <Signature />
            </Link>
          ) : null}
          <div>{children}</div>
        </div>
      </div>
    </OnlyDesktop>
  )
}

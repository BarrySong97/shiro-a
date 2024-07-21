import { DialogContent, DialogPortal, Root } from '@radix-ui/react-dialog'
import { ReactNode, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'

import { useIsMobile } from '~/atoms/hooks'
import { DialogOverlay } from '~/components/ui/dialog/DialogOverlay'
import { PresentSheet } from '~/components/ui/sheet'
import { useIsClient } from '~/hooks/common/use-is-client'
import { useAppConfigSelector } from '~/providers/root/aggregation-data-provider'

// TODO this component only use once in current page.
const positionAtom = atom({
  x: 0,
  y: 0,
})
const overlayShowAtom = atom(false)

export const WechatDialog = ({ children }: { children: ReactNode }) => {
  const isClient = useIsClient()

  const [overlayOpen, setOverlayShow] = useAtom(overlayShowAtom)

  if (!isClient) return null

  return (
    <>
      <WechatButton>{children}</WechatButton>
      <Root open={overlayOpen}>
        <DialogPortal forceMount>
          <div>
            <AnimatePresence>
              {overlayOpen && (
                <>
                  <DialogOverlay />
                  <DialogContent
                    onClick={() => {
                      setOverlayShow(false)
                    }}
                    className="fixed inset-0 z-[11] flex flex-col center"
                  >
                    <DonateContent />
                  </DialogContent>
                </>
              )}
            </AnimatePresence>
          </div>
        </DialogPortal>
      </Root>
    </>
  )
}

const WechatButton = ({ children }: { children: ReactNode }) => {
  const setPosition = useSetAtom(positionAtom)
  const setOverlayShow = useSetAtom(overlayShowAtom)

  const [sheetOpen, setSheetOpen] = useState(false)
  const isMobile = useIsMobile()

  return (
    <>
      <div
        onClick={() => {
          setSheetOpen(true)
          setOverlayShow(true)
        }}
        onMouseEnter={(e) => {
          if (isMobile) return
          const $el = e.target as HTMLButtonElement
          const rect = $el.getBoundingClientRect()
          setPosition({
            x: rect.left,
            y: rect.top,
          })

          // setOverlayShow(true)
        }}
        className="flex center"
      >
        {children}
      </div>
      {isMobile && (
        <PresentSheet
          content={DonateContent}
          open={sheetOpen}
          dismissible
          onOpenChange={setSheetOpen}
        />
      )}
    </>
  )
}
const DonateContent = () => {
  const donate = useAppConfigSelector((config) => config.module?.donate)

  return (
    <>
      <div className="flex flex-wrap gap-4 overflow-auto center">
        {[
          'https://barrysong4real.cc/public/wechat_blog.png',
          'https://barrysong4real.cc/public/wechat.jpg',
        ].map((src) => (
          <m.img
            exit={{ opacity: 0 }}
            src={src}
            alt="donate"
            className="h-[300px] max-h-[70vh]"
            key={src}
          />
        ))}
      </div>
    </>
  )
}

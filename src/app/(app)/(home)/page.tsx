'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { createElement } from 'react'
import clsx from 'clsx'
import { m } from 'framer-motion'
import Image from 'next/image'
import type React from 'react'

import { useIsMobile } from '~/atoms/hooks'
import { ErrorBoundary } from '~/components/common/ErrorBoundary'
import {
  FaSolidComments,
  FaSolidFeatherAlt,
  FaSolidHistory,
  FaSolidUserFriends,
  IcTwotoneSignpost,
  MdiFlask,
  MdiLightbulbOn20,
  RMixPlanet,
} from '~/components/icons/menu-collection'
import { isSupportIcon, SocialIcon } from '~/components/modules/home/SocialIcon'
import { usePresentSubscribeModal } from '~/components/modules/subscribe'
import { StyledButton } from '~/components/ui/button'
import { NumberSmoothTransition } from '~/components/ui/number-transition/NumberSmoothTransition'
import { BottomToUpTransitionView } from '~/components/ui/transition'
import { microReboundPreset, softBouncePreset } from '~/constants/spring'
import { clsxm } from '~/lib/helper'
import { noopObj } from '~/lib/noop'
import { apiClient } from '~/lib/request'
import { toast } from '~/lib/toast'
import {
  useAggregationSelector,
  useAppConfigSelector,
} from '~/providers/root/aggregation-data-provider'

import About from './components/about'
import { ActivityPostList } from './components/ActivityPostList'
import { ActivityRecent } from './components/ActivityRecent'
import Eduacation from './components/Education'
import SparklesText from './components/SparkText'
import Stack from './components/Stack'
import Work from './components/Work'
import { useHomeQueryData } from './query'

export default function Home() {
  return (
    <div>
      <Hero />
      {/* <ActivityScreen /> */}
      {/* <Windsock /> */}
    </div>
  )
}
const TwoColumnLayout = ({
  children,
  leftContainerClassName,
  rightContainerClassName,
  className,
}: {
  children:
    | [React.ReactNode, React.ReactNode]
    | [React.ReactNode, React.ReactNode, React.ReactNode]

  leftContainerClassName?: string
  rightContainerClassName?: string
  className?: string
}) => {
  return (
    <div
      className={clsxm(
        'relative mx-auto block size-full min-w-0 max-w-[1800px] flex-col flex-wrap items-center lg:flex lg:flex-row',
        className,
      )}
    >
      {children.slice(0, 2).map((child, i) => {
        return (
          <div
            key={i}
            className={clsxm(
              'flex w-full flex-col center lg:h-auto lg:w-1/2',

              i === 0 ? leftContainerClassName : rightContainerClassName,
            )}
          >
            <div className="relative max-w-full lg:max-w-2xl">{child}</div>
          </div>
        )
      })}

      {children[2]}
    </div>
  )
}

const Hero = () => {
  const data = useHomeQueryData()
  const stack = ['React', 'Nestjs', 'Fastapi']
  const socials = [
    {
      type: 'github',
      id: 'BarrySong97',
    },
    {
      type: 'twitter',
      id: 'BarrySong97',
    },
    {
      type: 'xiaohongshu',
      id: '6404c6b30000000029017fce',
    },
    {
      type: 'bilibili',
      id: '868586',
    },
    {
      type: 'mail',
      id: '524000659@qq.com',
    },
    {
      type: 'wechat',
      id: '868586',
    },
  ]
  const { title, description } = useAppConfigSelector((config) => {
    return {
      ...config.hero,
    }
  })!
  const siteOwner = useAggregationSelector((agg) => agg.user)
  const { avatar, socialIds } = siteOwner || {}

  const titleAnimateD =
    title.template.reduce((acc, cur) => {
      return acc + (cur.text?.length || 0)
    }, 0) * 50
  const isMobile = useIsMobile()
  return (
    <div className="mt-12 flex min-w-0 max-w-screen overflow-hidden lg:mt-[-4.5rem] lg:h-dvh lg:min-h-[800px]">
      <img
        src="/siteowner.jpg"
        alt=""
        className="hidden h-full object-cover lg:block"
      />
      <div className="no-scrollbar flex-1 overflow-auto scroll-smooth">
        <div className="flex h-[calc(100vh-120px)] items-center justify-center lg:h-screen">
          <m.div
            className="group relative text-center leading-[4] lg:text-left"
            variants={{
              hidden: { opacity: 0.0001, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            whileInView={'visible'}
            transition={softBouncePreset}
          >
            <div className="flex flex-col gap-4">
              <div
                className={clsx(
                  'lg:size-[300px]',
                  'size-[100px]',
                  'self-center',
                  'block lg:hidden',
                )}
              >
                <Image
                  height={300}
                  width={300}
                  src={'/siteowner.jpg'}
                  alt="Site Owner Avatar"
                  className={clsxm(
                    'aspect-square rounded-full border border-slate-200 object-cover dark:border-neutral-800',
                    'w-full',
                  )}
                />
              </div>
              <h1 className="mx-2 text-5xl font-medium lg:text-6xl">
                <SparklesText text="BarrySong4Real" className="text-left" />
              </h1>
              <div className="flex gap-4">
                <h1 className="text-4xl font-light">全栈工程师</h1>
                <div className="flex gap-1 self-end">
                  {stack.map((v, index) => {
                    return (
                      <div key={v} className="text-lg">
                        {v} {index != stack.length - 1 && '·'}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            <ul className="mx-2 mt-4 !flex flex-wrap items-center justify-center gap-4 lg:mx-auto lg:justify-start">
              {socials.map(({ type, id }, index) => {
                if (!isSupportIcon(type)) return null
                return (
                  <BottomToUpTransitionView
                    key={type}
                    delay={index * 100 + 500}
                    className="inline-block"
                    as="li"
                  >
                    <SocialIcon id={id} type={type} />
                  </BottomToUpTransitionView>
                )
              })}
            </ul>
            <a href="#aboutme">
              <button
                type="button"
                className="rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
              >
                关于我
              </button>
            </a>
          </m.div>
        </div>
        <div
          className="mt-32 flex min-h-screen center lg:mt-0"
          id={isMobile ? 'nothing' : 'aboutme'}
        >
          <m.div
            className="group relative mx-auto mb-32 space-y-8 text-center leading-[4] lg:mb-0 lg:text-left"
            variants={{
              hidden: { opacity: 0.0001, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            whileInView={'visible'}
            transition={{
              ...softBouncePreset,
            }}
          >
            {isMobile ? (
              <h2 className="h-32 w-1 lg:h-0 lg:w-0" id="aboutme"></h2>
            ) : null}
            <About data={data.resume.about} />
            <Stack data={data.resume.stack} />
            <Work data={data.resume.work} />
            <Eduacation data={data.resume.education} />
          </m.div>
        </div>
      </div>
      {/* <TwoColumnLayout leftContainerClassName="mt-[120px] lg:mt-0 h-[15rem] lg:h-1/2">
        <>
          <m.div
            className="group relative text-center leading-[4] lg:text-left [&_*]:inline-block"
            initial={{ opacity: 0.0001, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={softBouncePreset}
          >
            <div>
              <h1 className="mx-2 text-4xl font-medium">BarrySong4Real</h1>
              <br />
              <h1 className="text-4xl font-light">全栈工程师</h1>
              <span className="relative -bottom-2 inline-block h-8 w-[1px] bg-gray-800/80 opacity-0 transition-opacity duration-200 group-hover:animation-blink group-hover:opacity-100 dark:bg-gray-200/80" />
            </div>
          </m.div>

          <BottomToUpTransitionView
            delay={titleAnimateD + 500}
            transition={softBouncePreset}
            className="my-3 text-center lg:text-left"
          >
            <span className="opacity-80">来自街头的程序员</span>
          </BottomToUpTransitionView>

          <ul className="mx-[60px] mt-8 flex flex-wrap gap-4 center lg:mx-auto lg:mt-28 lg:justify-start">
            {Object.entries(socialIds || noopObj).map(
              ([type, id]: any, index) => {
                if (!isSupportIcon(type)) return null
                return (
                  <BottomToUpTransitionView
                    key={type}
                    delay={index * 100 + titleAnimateD + 500}
                    className="inline-block"
                    as="li"
                  >
                    <SocialIcon id={id} type={type} />
                  </BottomToUpTransitionView>
                )
              },
            )}
          </ul>
        </>

        <div
          className={clsx('lg:size-[300px]', 'size-[200px]', 'mt-24 lg:mt-0')}
        >
          <Image
            height={300}
            width={300}
            src={'/siteowner.jpg'}
            alt="Site Owner Avatar"
            className={clsxm(
              'aspect-square rounded-full border border-slate-200 object-cover dark:border-neutral-800',
              'w-full',
            )}
          />
        </div>

        <m.div
          initial={{ opacity: 0.0001, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={softBouncePreset}
          className={clsx(
            'inset-x-0 bottom-0 mt-12 flex flex-col center lg:absolute lg:mt-0',

            'text-neutral-800/80 center dark:text-neutral-200/80',
          )}
        >
          <small className="text-center">
            当第一颗卫星飞向大气层外，我们便以为自己终有一日会征服宇宙。
          </small>
          <span className="mt-8 animate-bounce">
            <i className="icon-[mingcute--right-line] rotate-90 text-2xl" />
          </span>
        </m.div>
      </TwoColumnLayout> */}
    </div>
  )
}

const ActivityScreen = () => {
  return (
    <div className="mt-24">
      <TwoColumnLayout
        rightContainerClassName="block lg:flex [&>div]:w-full pr-4"
        leftContainerClassName="[&>div]:w-full"
      >
        {/* <ActivityPostList /> */}
        <div></div>
        <ErrorBoundary>
          <ActivityRecent />
        </ErrorBoundary>
      </TwoColumnLayout>
    </div>
  )
}

const windsock = [
  {
    title: '文稿',
    path: '/posts',
    type: 'Post',
    subMenu: [],
    icon: IcTwotoneSignpost,
  },
  {
    title: '手记',
    type: 'Note',
    path: '/notes',
    icon: FaSolidFeatherAlt,
  },
  {
    title: '度过的时光呀',
    icon: FaSolidHistory,
    path: '/timeline',
  },
  {
    title: '朋友们',
    icon: FaSolidUserFriends,
    path: '/friends',
  },
  {
    title: '写下一点思考',
    icon: MdiLightbulbOn20,
    path: '/thinking',
  },
  {
    title: '看看我做些啥',
    icon: MdiFlask,
    path: '/projects',
  },
  {
    title: '记录下一言',
    path: '/says',
    icon: FaSolidComments,
  },
  {
    title: '跃迁',
    icon: RMixPlanet,
    path: 'https://travel.moe/go.html',
  },
]

const Windsock = () => {
  const likeQueryKey = ['site-like']
  const { data: count } = useQuery({
    queryKey: likeQueryKey,
    queryFn: () => apiClient.proxy('like_this').get(),
    refetchInterval: 1000 * 60 * 5,
  })

  const queryClient = useQueryClient()

  const { present: presentSubscribe } = usePresentSubscribeModal()
  return (
    <>
      <div className="mt-28 flex flex-col center">
        <div className="my-5 text-2xl font-medium">风向标</div>
        <div className="mb-24 opacity-90">去到别去看看？</div>
        <ul className="flex flex-col flex-wrap gap-2 gap-y-8 opacity-80 lg:flex-row">
          {windsock.map((item, index) => {
            return (
              <m.li
                initial={{ opacity: 0.0001, y: 10 }}
                viewport={{ once: true }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    stiffness: 641,
                    damping: 23,
                    mass: 3.9,
                    type: 'spring',
                    delay: index * 0.05,
                  },
                }}
                transition={{
                  delay: 0.001,
                }}
                whileHover={{
                  y: -10,
                  transition: {
                    ...microReboundPreset,
                    delay: 0.001,
                  },
                }}
                key={index}
                className="flex items-center justify-between text-sm"
              >
                <a
                  href={item.path}
                  className="flex items-center gap-4 text-neutral-800 duration-200 hover:!text-accent dark:text-neutral-200"
                >
                  {createElement(item.icon, { className: 'w-6 h-6' })}
                  <span>{item.title}</span>
                </a>

                {index != windsock.length - 1 && (
                  <span className="mx-4 hidden select-none lg:inline"> · </span>
                )}
              </m.li>
            )
          })}
        </ul>
      </div>

      <div className="mt-24 flex justify-center gap-4">
        <StyledButton
          className="flex gap-2 bg-red-400 center"
          onClick={() => {
            apiClient
              .proxy('like_this')
              .post()
              .then(() => {
                queryClient.setQueryData(likeQueryKey, (prev: any) => {
                  return prev + 1
                })
              })

            toast('谢谢你！', undefined, {
              iconElement: (
                <m.i
                  className="icon-[mingcute--heart-fill] text-uk-red-light"
                  initial={{
                    scale: 0.96,
                  }}
                  animate={{
                    scale: 1.22,
                  }}
                  transition={{
                    easings: ['easeInOut'],
                    delay: 0.3,
                    repeat: 5,
                    repeatDelay: 0.3,
                  }}
                />
              ),
            })
          }}
        >
          喜欢本站 <i className="icon-[mingcute--heart-fill]" />{' '}
          <NumberSmoothTransition>
            {count as any as string}
          </NumberSmoothTransition>
        </StyledButton>

        <StyledButton
          className="flex gap-2 center"
          onClick={() => {
            presentSubscribe()
          }}
        >
          订阅
          <i className="icon-[material-symbols--notifications-active]" />
        </StyledButton>
      </div>
    </>
  )
}

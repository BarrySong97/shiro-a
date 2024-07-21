import React, { FC } from 'react'

import { Badge } from '~/components/magic-ui/badge'

import BlurFade from './blur-fade'

const BLUR_FADE_DELAY = 0.04
export interface StackProps {
  data: string[]
}
const Stack: FC<StackProps> = ({ data }) => {
  return (
    <section id="skills">
      <div className="">
        <BlurFade delay={BLUR_FADE_DELAY * 9}>
          <h2 className="text-left text-xl font-bold">技术栈</h2>{' '}
        </BlurFade>{' '}
        <div className="flex flex-wrap gap-x-2 pb-4">
          {data.map((skill, id) => (
            <BlurFade
              key={skill}
              delay={BLUR_FADE_DELAY * 10 + id * 0.05}
              className="h-8"
            >
              <Badge
                className="bg-black text-white dark:bg-[#F5F5F5] dark:text-black"
                key={skill}
              >
                {skill}
              </Badge>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stack

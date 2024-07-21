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
      <div className="flex min-h-0 flex-col">
        <BlurFade delay={BLUR_FADE_DELAY * 9}>
          <h2 className="text-xl font-bold">技术栈</h2>{' '}
        </BlurFade>{' '}
        <div className="flex flex-wrap gap-2">
          {data.map((skill, id) => (
            <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
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

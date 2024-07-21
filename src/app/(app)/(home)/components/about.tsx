import React, { FC } from 'react'

import BlurFade from './blur-fade'

const BLUR_FADE_DELAY = 0.04
export interface AboutProps {
  data: string[]
}
const About: FC<AboutProps> = ({ data }) => {
  const year = new Date().getFullYear() - 2020
  return (
    <section id="about">
      <BlurFade delay={BLUR_FADE_DELAY * 3} className="mb-4">
        <h2 className="text-xl font-bold">关于</h2>
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 4}>
        <div
          style={{
            color: ' rgb(115, 115, 115)',
          }}
          className="text-muted-foreground max-w-full text-pretty font-sans !text-base dark:prose-invert dark:!text-zinc-300"
        >
          <p>
            练习时长{year}
            年的全栈工程师，技术偏前。
          </p>
          {data.map((item, id) => (
            <p key={id}>{item}</p>
          ))}
        </div>
      </BlurFade>
    </section>
  )
}

export default About

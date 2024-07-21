import React, { FC } from 'react'

import { Work } from '../query'
import BlurFade from './blur-fade'
import { ResumeCard } from './resume-card'

const BLUR_FADE_DELAY = 0.04
export interface WorkingProps {
  data: Work[]
}
const Working: FC<WorkingProps> = ({ data }) => {
  return (
    <section id="work">
      <div className="flex min-h-0 flex-col gap-y-4">
        <BlurFade delay={BLUR_FADE_DELAY * 5}>
          <h2 className="text-left text-xl font-bold">工作经历</h2>
        </BlurFade>
        {data.map((work, id) => (
          <BlurFade key={work.company} delay={BLUR_FADE_DELAY * 6 + id * 0.05}>
            <ResumeCard
              key={work.company}
              logoUrl={work.logoUrl}
              altText={work.company}
              title={work.company}
              subtitle={work.title}
              location={work.location}
              href={work.href}
              badges={work.badges}
              period={`${work.start} - ${work.end ?? 'Present'}`}
              description={work.description}
            />
          </BlurFade>
        ))}
      </div>
    </section>
  )
}

export default Working

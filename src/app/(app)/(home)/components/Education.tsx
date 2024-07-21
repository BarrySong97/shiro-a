import React, { FC } from 'react'

import { Education } from '../query'
import BlurFade from './blur-fade'
import { ResumeCard } from './resume-card'

const BLUR_FADE_DELAY = 0.04
export interface EduacationProps {
  data: Education[]
}
const Eduacation: FC<EduacationProps> = ({ data }) => {
  return (
    <section id="education">
      <div className="flex min-h-0 flex-col gap-y-4">
        <BlurFade delay={BLUR_FADE_DELAY * 7}>
          <h2 className="text-left text-xl font-bold">教育</h2>
        </BlurFade>
        {data.map((education, id) => (
          <BlurFade
            key={education.school}
            delay={BLUR_FADE_DELAY * 8 + id * 0.05}
          >
            <ResumeCard
              key={education.school}
              href={education.href}
              logoUrl={education.logoUrl}
              altText={education.school}
              title={education.school}
              subtitle={education.degree}
              period={`${education.start} - ${education.end}`}
            />
          </BlurFade>
        ))}
      </div>
    </section>
  )
}

export default Eduacation

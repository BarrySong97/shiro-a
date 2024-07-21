/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useQuery } from '@tanstack/react-query'
import type { AggregateTop } from '@mx-space/api-client'

export const queryKey = ['home']
/**
 * Resume
 */
export type Resume = {
  about: string[]
  education: Education[]
  stack: string[]
  work: Work[]
}

/**
 * Education
 */
export type Education = {
  /**
   * The degree obtained
   */
  degree: string
  /**
   * The end date of the education period
   */
  end: Date
  /**
   * The URL link to the school's website
   */
  href: string
  /**
   * The URL of the school's logo
   */
  logoUrl: string
  /**
   * The name of the school
   */
  school: string
  /**
   * The start date of the education period
   */
  start: Date
}

/**
 * Work
 */
export type Work = {
  /**
   * A list of badges associated with the company
   */
  badges: string[]
  /**
   * The name of the company
   */
  company: string
  /**
   * The URL link to the company's website
   */
  href: string
  /**
   * The location of the company
   */
  location: string
  /**
   * The URL of the company's logo
   */
  logoUrl: string
  /**
   * The title of the job position
   */
  title: string
  start: string
  end: string
  description: string
}

export const useHomeQueryData = () => {
  return useQuery({
    queryKey,
    queryFn: async () => null! as { resume: Resume; top: AggregateTop },
    enabled: false,
  }).data!
}

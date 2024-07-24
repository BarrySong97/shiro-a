'use client'

import React, { FC, useEffect } from 'react'

import { AestheticFluidBg } from '../AestheticFluidBg.module.js'
import { Book } from '../ProjectList'

export interface ProjectItemProps {
  data: Book
}
const BookItem: FC<ProjectItemProps> = ({ data }) => {
  useEffect(() => {
    let colorbg = new AestheticFluidBg({
      dom: data.title,
      colors: data.colors,
      loop: true,
    })
  }, [])
  return (
    <a
      href={data.url}
      target="_blank"
      id={data.title}
      className={`relative h-[340px] rounded-md shadow-md 2xl:h-[400px] [&>canvas]:rounded-md ${data.title}`}
    >
      <div className="absolute bottom-8 left-4 z-50 text-xl font-semibold text-white">
        {data.title}
      </div>
    </a>
  )
}

export default BookItem

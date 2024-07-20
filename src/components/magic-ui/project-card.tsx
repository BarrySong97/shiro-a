import Image from 'next/image'
import Link from 'next/link'

import { Badge } from './badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './card'
import { cn } from './utils'

interface Props {
  title: string
  href?: string
  description: string
  start: string
  end: string
  tech: readonly string[]
  link?: string
  image?: string
  video?: string
  links?: readonly {
    icon: React.ReactNode
    type: string
    href: string
  }[]
  className?: string
}

export function ProjectCard({
  title,
  href,
  description,
  start,
  end,
  tech,
  link,
  image,
  video,
  links,
  className,
}: Props) {
  return (
    <Card
      className={
        'flex h-full flex-col overflow-hidden border bg-white transition-all duration-300 ease-out hover:shadow-lg'
      }
    >
      <Link
        href={href || '#'}
        className={cn('block cursor-pointer', className)}
      >
        {video && (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="pointer-events-none mx-auto h-60 w-full object-cover object-top" // needed because random black line at bottom of video
          />
        )}
        {image && (
          <Image
            src={image}
            alt={title}
            className="h-40 w-full overflow-hidden object-cover object-top"
          />
        )}
      </Link>
      <CardHeader className="px-2">
        <div className="mt-3 space-y-2 text-left">
          <CardTitle className="mt-2 !text-base">{title}</CardTitle>
          <time
            style={{
              color: 'rgb(8, 9, 10)',
            }}
            className="font-sans !text-xs"
          >{`${start} - ${end}`}</time>
          <div className="hidden font-sans text-xs underline print:visible">
            {link?.replace('https://', '').replace('www.', '').replace('/', '')}
          </div>
          <div
            style={{
              color: 'rgb(115, 115, 115)',
            }}
            className="text-muted-foreground prose max-w-full text-pretty font-sans !text-sm dark:prose-invert"
          >
            {description}
          </div>
        </div>
      </CardHeader>
      <CardContent className="mt-2 flex flex-col px-2">
        {tech && tech.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {tech?.map((tag) => (
              <Badge
                className="px-1 py-0 text-[10px]"
                style={{
                  backgroundColor: 'rgba(245, 245, 245, 0.8)',
                  color: 'rgb(23, 23, 23)',
                }}
                variant="secondary"
                key={tag}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="px-2 pb-2">
        {links && links.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-1">
            {links?.map((link, idx) => (
              <Link href={link?.href} key={idx} target="_blank">
                <Badge
                  key={idx}
                  className="flex gap-2 bg-black px-2 py-1 text-[10px] text-white"
                >
                  {link.icon}
                  {link.type}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

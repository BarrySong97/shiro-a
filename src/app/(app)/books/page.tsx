'use client'

import { useQuery } from '@tanstack/react-query'

import { Book, BookList } from '~/components/modules/book/ProjectList'
import { NothingFound } from '~/components/modules/shared/NothingFound'
import { Loading } from '~/components/ui/loading'
import { BottomToUpTransitionView } from '~/components/ui/transition'
import { noopArr } from '~/lib/noop'
import { apiClient } from '~/lib/request'

export default function Page() {
  const { data, isLoading } = useQuery({
    queryKey: ['books'],
    queryFn: async () => {
      const data = await apiClient.snippet.getByReferenceAndName('book', 'book')
      return data.$serialized
    },
  })

  if (isLoading) {
    return <Loading useDefaultLoadingText />
  }

  return (
    <div className="mt-10 pb-32">
      <header className="prose my-12 flex items-center">
        <h1 className="flex items-center">小册</h1>{' '}
      </header>{' '}
      <main>
        <BottomToUpTransitionView>
          <BookList books={(data as Book[]) || noopArr} />
        </BottomToUpTransitionView>
      </main>
    </div>
  )
}

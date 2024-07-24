import type { FC } from 'react'

import BookItem from './components/BookItem'

export type Book = {
  cover?: string
  finished: boolean
  title: string
  url: string
  colors?: string[]
}

export const BookList: FC<{ books: Book[] }> = (props) => {
  return (
    <section key="list" className="text-center">
      <div className="grid min-w-0 grid-cols-1 gap-12 lg:grid-cols-3">
        {props.books.map((book) => {
          return <BookItem key={book.title} data={book} />
        })}
      </div>
    </section>
  )
}

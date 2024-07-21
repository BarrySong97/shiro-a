import { dehydrate } from '@tanstack/react-query'

import { QueryHydrate } from '~/components/common/QueryHydrate'
import { isShallowEqualArray } from '~/lib/lodash'
import { getQueryClient } from '~/lib/query-client.server'
import { apiClient } from '~/lib/request'
import { definePrerenderPage, requestErrorHandler } from '~/lib/request.server'

import { queryKey } from './query'

export const dynamic = 'force-dynamic'
export const revalidate = 3600
export default definePrerenderPage()({
  async fetcher() {
    const queryClient = getQueryClient()
    const res = queryClient
      .fetchQuery({
        queryKey,
        queryFn: async () => {
          const res = await apiClient.snippet.getByReferenceAndName(
            'resume',
            'resume',
          )

          return { resume: res.$serialized }
        },
      })
      .catch(requestErrorHandler)

    return res
  },
  async Component(props) {
    const queryClient = getQueryClient()

    const dehydrateState = dehydrate(queryClient, {
      shouldDehydrateQuery(query) {
        return isShallowEqualArray(query.queryKey as any, queryKey)
      },
    })
    return <QueryHydrate state={dehydrateState}>{props.children}</QueryHydrate>
  },
})

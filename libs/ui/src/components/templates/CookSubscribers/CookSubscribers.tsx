import {
  QueryMode,
  useOrdersForKitchenQuery,
  useSchedulesForKitchenQuery,
} from '@home-chefs-org/network/src/generated'
import { ShowData } from '../../organisms/ShowData'
import { useTakeSkip } from '@home-chefs-org/util'
import { OrderCard } from '../../organisms/OrderCard'
import { useState } from 'react'
import { HtmlLabel } from '../../atoms/HtmlLabel'
import { HtmlInput } from '../../atoms/HtmlInput'
import { useDebouncedValue } from '@home-chefs-org/hooks/src/async'
import { SubscriberCard } from '../../organisms/SubscriberCard'

export interface ICookOrdersProps {}

export const CookSubscribers = () => {
  const { setSkip, setTake, skip, take } = useTakeSkip()
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebouncedValue(searchTerm)
  const { loading, data } = useSchedulesForKitchenQuery({
    variables: {
      take,
      skip,
      where: {
        OR: [
          {
            customer: {
              is: {
                name: {
                  contains: debouncedSearchTerm,
                  mode: QueryMode.Insensitive,
                },
              },
            },
          },
        ],
      },
    },
  })

  return (
    <div className="mt-2 space-y-6">
      <HtmlLabel title="Search customer">
        <HtmlInput
          value={searchTerm}
          placeholder="Search customer"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </HtmlLabel>
      <ShowData
        loading={loading}
        pagination={{
          resultCount: data?.schedulesForKitchen.length,
          totalCount: data?.schedulesCount.count,
          setSkip,
          setTake,
          skip,
          take,
        }}
        title={'Subscribers'}
      >
        {data?.schedulesForKitchen.map((subscriber) => (
          <SubscriberCard key={subscriber.id} subscriber={subscriber} />
        ))}
      </ShowData>
    </div>
  )
}

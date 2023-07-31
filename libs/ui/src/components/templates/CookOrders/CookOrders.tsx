import {
  QueryMode,
  useOrdersForKitchenQuery,
} from '@home-chefs-org/network/src/generated'
import { ShowData } from '../../organisms/ShowData'
import { useTakeSkip } from '@home-chefs-org/util'
import { OrderCard } from '../../organisms/OrderCard'
import { useState } from 'react'
import { HtmlLabel } from '../../atoms/HtmlLabel'
import { HtmlInput } from '../../atoms/HtmlInput'
import { useDebouncedValue } from '@home-chefs-org/hooks/src/async'

export interface ICookOrdersProps {}

export const CookOrders = () => {
  const { setSkip, setTake, skip, take } = useTakeSkip()
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebouncedValue(searchTerm)
  const { loading, data } = useOrdersForKitchenQuery({
    variables: {
      take,
      skip,
      where: {
        OR: [
          { passcode: { contains: debouncedSearchTerm } },
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
      <HtmlInput
        value={searchTerm}
        placeholder="Search passcode or customer name"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <ShowData
        loading={loading}
        pagination={{
          resultCount: data?.ordersForKitchen.length,
          totalCount: data?.ordersCount.count,
          setSkip,
          setTake,
          skip,
          take,
        }}
        title={'Orders'}
        className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {data?.ordersForKitchen.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </ShowData>
    </div>
  )
}

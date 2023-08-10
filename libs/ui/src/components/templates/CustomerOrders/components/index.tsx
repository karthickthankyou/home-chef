import {
  DateTimeFilter,
  InputMaybe,
  useOrdersForCustomerLazyQuery,
} from '@home-chefs-org/network/src/generated'
import { format } from 'date-fns'
import React, { ReactNode, useEffect } from 'react'
import Badge from '../../../atoms/Badge'
import { PlainButton } from '../../../atoms/PlainButton'
import { Table } from '../../../organisms/Table'
import { TableCell, TableHead, TableRow } from '../../../organisms/Table/Table'

export const getDatesFilter = ({
  type,
}: {
  type: 'Today' | 'Upcoming' | 'Previous'
}): InputMaybe<DateTimeFilter> => {
  const dates = getTodayAndTomorrow()

  switch (type) {
    case 'Previous':
      return { lt: dates.today }
    case 'Today':
      return { gte: dates.today, lt: dates.tomorrow }
    case 'Upcoming':
      return { gt: dates.today }
  }
}

export const getTodayAndTomorrow = () => {
  const today = new Date()
  today.setUTCHours(0, 0, 0, 0)

  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setUTCHours(0, 0, 0, 0)
  return { today: today.toISOString(), tomorrow: tomorrow.toISOString() }
}

export const CustomerOrderData = React.memo(
  ({ type }: { type: 'Today' | 'Upcoming' | 'Previous' }) => {
    const [getOrdersForCustomer, { data, loading }] =
      useOrdersForCustomerLazyQuery()

    useEffect(() => {
      const dateFilter = getDatesFilter({ type })
      getOrdersForCustomer({ variables: { where: { time: dateFilter } } })
    }, [type])

    if (data?.ordersForCustomer.length === 0)
      return (
        <div className="flex items-center justify-center bg-gray-50 h-52">
          No orders found.
        </div>
      )

    return (
      <div>
        <div className="flex justify-end">
          <PlainButton
            onClick={() =>
              getOrdersForCustomer({
                fetchPolicy: 'network-only',
              })
            }
          >
            Refresh
          </PlainButton>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item name</TableCell>
              <TableCell align="right">Order ID</TableCell>
              <TableCell align="right">Time</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          {data?.ordersForCustomer.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.schedule?.foodItem.name}</TableCell>
              <TableCell align="right">{order.id}</TableCell>
              <TableCell align="right">
                {format(new Date(order.time), 'PPp')}
              </TableCell>
              <TableCell align="right">{order.quantity}</TableCell>
              <TableCell align="right">{order.price}</TableCell>
              <TableCell align="right">
                <Badge>{order.status}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </div>
    )
  },
)

export const LayoutWithHeader = ({
  heading,
  children,
  empty = false,
}: {
  heading: string
  children: ReactNode
  empty?: boolean
}) => (
  <div>
    <div className="text-lg">{heading}</div>
    {children}
  </div>
)

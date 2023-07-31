import { OrdersForKitchenQuery } from '@home-chefs-org/network/src/generated'
import { format } from 'date-fns'
import { Reveal } from '../../molecules/Reveal'
import { IconX } from '@tabler/icons-react'

export interface IOrderCardProps {
  order: OrdersForKitchenQuery['ordersForKitchen'][0]
}

export const OrderCard = ({ order }: IOrderCardProps) => {
  return (
    <div className="p-3 bg-white rounded shadow-md">
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-2">
          <div className="font-semibold">{order.customer.name}</div>
          <div className="flex gap-2">
            <div>{order.schedule?.foodItem.name}</div>
            <div>
              <IconX className="p-1" />
            </div>
            <div>{order.quantity}</div>
          </div>
          <div>Rs. {order.price}</div>
          <Reveal className="mt-2" secret={order.passcode} />
        </div>
        <div className="p-1 border rounded">
          <div>{format(new Date(order.time), 'p')}</div>
          <div className="text-xs">{format(new Date(order.time), 'PP')}</div>
        </div>
      </div>
    </div>
  )
}

import {
  Day,
  SchedulesForKitchenQuery,
} from '@home-chefs-org/network/src/generated'
import { IconX } from '@tabler/icons-react'
import { ToggleButtonGroup } from '../../molecules/ToggleButtonGroup'
import { ToggleButton } from '../../molecules/ToggleButtonGroup/ToggleButtonGroup'
import { DayIcons } from '../../molecules/WeekCalendar/WeekCalendar'

export interface ISubscriberCardProps {
  subscriber: SchedulesForKitchenQuery['schedulesForKitchen'][0]
}

export const SubscriberCard = ({ subscriber }: ISubscriberCardProps) => {
  return (
    <div className="p-3 bg-white rounded shadow-lg">
      <div className="font-semibold">{subscriber.customer.name}</div>
      <div className="flex">
        <div>{subscriber.foodItem.name}</div>
        <IconX className="p-1" />
        <div>{subscriber.quantity}</div>
      </div>
      <div>{subscriber.live}</div>

      <ToggleButtonGroup>
        {Object.entries(DayIcons).map(([key, Icon]) => {
          return (
            <ToggleButton
              key={key}
              selected={subscriber.days?.includes(key as Day)}
              value={key}
              className="cursor-auto"
            >
              {Icon}
            </ToggleButton>
          )
        })}
      </ToggleButtonGroup>
    </div>
  )
}

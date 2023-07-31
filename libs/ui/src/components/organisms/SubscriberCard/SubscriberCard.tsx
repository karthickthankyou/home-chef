import {
  SchedulesForKitchenQuery,
  Day,
} from '@home-chefs-org/network/src/generated'
import { ToggleButtonGroup } from '../../molecules/ToggleButtonGroup'
import { DayIcons } from '../../molecules/WeekCalendar/WeekCalendar'
import { ToggleButton } from '../../molecules/ToggleButtonGroup/ToggleButtonGroup'
import { IconX } from '@tabler/icons-react'

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

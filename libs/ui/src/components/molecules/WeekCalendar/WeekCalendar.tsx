import { Day, FoodItem } from '@home-chefs-org/network/src/generated'
import {
  IconLetterF,
  IconLetterM,
  IconLetterS,
  IconLetterT,
  IconLetterW,
} from '@tabler/icons-react'
import { ToggleButtonGroup } from '../ToggleButtonGroup'
import { ToggleButton } from '../ToggleButtonGroup/ToggleButtonGroup'

export interface IWeekCalendarProps {
  days: FoodItem['days']
}

export const DayIcons = {
  [Day.Monday]: <IconLetterM className="p-1.5" />,
  [Day.Tuesday]: <IconLetterT className="p-1.5" />,
  [Day.Wednesday]: <IconLetterW className="p-1.5" />,
  [Day.Thursday]: <IconLetterT className="p-1.5" />,
  [Day.Friday]: <IconLetterF className="p-1.5" />,
  [Day.Saturday]: <IconLetterS className="p-1.5" />,
  [Day.Sunday]: <IconLetterS className="p-1.5" />,
}

export const WeekCalendar = ({ days }: IWeekCalendarProps) => (
  <ToggleButtonGroup>
    {Object.entries(DayIcons).map(([key, Icon]) => {
      return (
        <ToggleButton
          key={key}
          selected={days?.includes(key as Day)}
          value={key}
          className="cursor-auto"
        >
          {Icon}
        </ToggleButton>
      )
    })}
  </ToggleButtonGroup>
)

export const WeekCalendarSelectPlain = () => (
  <>
    {Object.entries(DayIcons).map(([key, Icon]) => (
      <ToggleButton key={key} value={key} aria-label={key}>
        {Icon}
      </ToggleButton>
    ))}
  </>
)

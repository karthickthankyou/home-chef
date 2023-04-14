import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { WeekCalendar } from './WeekCalendar'

export default {
  title: 'src/components/molecules/WeekCalendar',
  component: WeekCalendar,
} as ComponentMeta<typeof WeekCalendar>

const Template: ComponentStory<typeof WeekCalendar> = (args) => (
  <WeekCalendar {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}

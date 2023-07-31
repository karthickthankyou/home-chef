import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { CustomerSchedules } from './CustomerSchedules'

export default {
  title: 'src/components/templates/CustomerSchedules',
  component: CustomerSchedules,
} as ComponentMeta<typeof CustomerSchedules>

const Template: ComponentStory<typeof CustomerSchedules> = (args) => (
  <CustomerSchedules />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}

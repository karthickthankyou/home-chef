import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { CustomerOrders } from './CustomerOrders'

export default {
  title: 'src/components/templates/CustomerOrders',
  component: CustomerOrders,
} as ComponentMeta<typeof CustomerOrders>

const Template: ComponentStory<typeof CustomerOrders> = (args) => (
  <CustomerOrders />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}

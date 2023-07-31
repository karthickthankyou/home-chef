import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { CookOrders } from './CookOrders'

export default {
  title: 'src/components/templates/CookOrders',
  component: CookOrders,
} as ComponentMeta<typeof CookOrders>

const Template: ComponentStory<typeof CookOrders> = (args) => <CookOrders />

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}

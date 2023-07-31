import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { OrderCard } from './OrderCard'

export default {
  title: 'src/components/organisms/OrderCard',
  component: OrderCard,
} as ComponentMeta<typeof OrderCard>

const Template: ComponentStory<typeof OrderCard> = (args) => (
  <OrderCard {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}

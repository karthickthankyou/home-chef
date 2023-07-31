import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { SubscriberCard } from './SubscriberCard'

export default {
  title: 'src/components/organisms/SubscriberCard',
  component: SubscriberCard,
} as ComponentMeta<typeof SubscriberCard>

const Template: ComponentStory<typeof SubscriberCard> = (args) => (
  <SubscriberCard {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}

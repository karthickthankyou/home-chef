import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { CookSubscribers } from './CookSubscribers'

export default {
  title: 'src/components/templates/CookSubscribers',
  component: CookSubscribers,
} as ComponentMeta<typeof CookSubscribers>

const Template: ComponentStory<typeof CookSubscribers> = (args) => (
  <CookSubscribers />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}

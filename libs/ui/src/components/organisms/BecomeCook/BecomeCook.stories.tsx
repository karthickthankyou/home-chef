import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { BecomeCook } from './BecomeCook'

export default {
  title: 'src/components/organisms/BecomeCook',
  component: BecomeCook,
} as ComponentMeta<typeof BecomeCook>

const Template: ComponentStory<typeof BecomeCook> = (args) => (
  <BecomeCook {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}

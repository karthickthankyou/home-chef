import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { CookInfo } from './CookPage'

export default {
  title: 'src/components/templates/CookPage',
  component: CookInfo,
} as ComponentMeta<typeof CookInfo>

const Template: ComponentStory<typeof CookInfo> = (args) => (
  <CookInfo {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}

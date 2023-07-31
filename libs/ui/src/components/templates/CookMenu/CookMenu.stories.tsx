import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { CookMenu } from './CookMenu'

export default {
  title: 'src/components/templates/CookMenu',
  component: CookMenu,
} as ComponentMeta<typeof CookMenu>

const Template: ComponentStory<typeof CookMenu> = (args) => (
  <CookMenu {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}

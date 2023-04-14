import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { CustomerPage } from './CustomerPage'

export default {
  title: 'src/components/organisms/CustomerPage',
  component: CustomerPage,
} as ComponentMeta<typeof CustomerPage>

const Template: ComponentStory<typeof CustomerPage> = (args) => (
  <CustomerPage {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}

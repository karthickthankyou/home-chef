import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { CookPage } from './CookPage'

export default {
  title: 'src/components/templates/CookPage',
  component: CookPage,
} as ComponentMeta<typeof CookPage>

const Template: ComponentStory<typeof CookPage> = (args) => <CookPage />

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}

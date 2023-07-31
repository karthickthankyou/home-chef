import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { IsCook } from './IsCook'

export default {
  title: 'src/components/molecules/IsCook',
  component: IsCook,
} as ComponentMeta<typeof IsCook>

const Template: ComponentStory<typeof IsCook> = (args) => <IsCook {...args} />

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}

import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DynamicHero } from './DynamicHero'

export default {
  title: 'src/components/organisms/DynamicHero',
  component: DynamicHero,
} as ComponentMeta<typeof DynamicHero>

const Template: ComponentStory<typeof DynamicHero> = (args) => (
  <DynamicHero {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}

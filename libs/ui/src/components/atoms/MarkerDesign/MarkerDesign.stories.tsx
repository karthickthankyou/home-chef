import { ComponentMeta, ComponentStory } from '@storybook/react'
import { MarkerDesign } from './MarkerDesign'

export default {
  title: 'atoms/MarkerDesign',
  component: MarkerDesign,
} as ComponentMeta<typeof MarkerDesign>

const Template: ComponentStory<typeof MarkerDesign> = (args) => (
  <MarkerDesign {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}

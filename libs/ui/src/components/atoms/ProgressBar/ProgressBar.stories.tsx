import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ProgressBar } from './ProgressBar'

export default {
  title: 'atoms/ProgressBar',
  component: ProgressBar,
} as ComponentMeta<typeof ProgressBar>

const Template: ComponentStory<typeof ProgressBar> = (args) => (
  <ProgressBar {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}

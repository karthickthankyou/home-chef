import { ComponentMeta, ComponentStory } from '@storybook/react'
import { PlainButton } from './PlainButton'

export default {
  title: 'src/components/atoms/PlainButton',
  component: PlainButton,
} as ComponentMeta<typeof PlainButton>

const Template: ComponentStory<typeof PlainButton> = (args) => (
  <PlainButton {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}

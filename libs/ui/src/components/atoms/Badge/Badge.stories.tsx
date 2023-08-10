import { ComponentMeta, ComponentStory } from '@storybook/react'
import Badge from './Badge'

export default {
  title: 'atoms/Badge',
  component: Badge,
} as ComponentMeta<typeof Badge>

const Template: ComponentStory<typeof Badge> = (args) => <Badge {...args} />

export const Primary = Template.bind({})
Primary.args = {
  children: 'Hello World',
  size: 'sm',
}
Primary.parameters = {}

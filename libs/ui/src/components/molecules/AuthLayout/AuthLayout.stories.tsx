import { ComponentMeta, ComponentStory } from '@storybook/react'
import { AuthLayout } from './AuthLayout'

export default {
  title: 'molecules/AuthLayout',
  component: AuthLayout,
} as ComponentMeta<typeof AuthLayout>

const Template: ComponentStory<typeof AuthLayout> = (args) => (
  <AuthLayout {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}

import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Form } from './Form'

export default {
  title: 'atoms/Form',
  component: Form,
} as ComponentMeta<typeof Form>

const Template: ComponentStory<typeof Form> = (args) => <Form {...args} />

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}

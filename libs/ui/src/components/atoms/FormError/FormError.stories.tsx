import { ComponentMeta, ComponentStory } from '@storybook/react'
import { FormError } from './FormError'

export default {
  title: 'atoms/FormError',
  component: FormError,
} as ComponentMeta<typeof FormError>

const Template: ComponentStory<typeof FormError> = (args) => (
  <FormError {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  error: 'Sample form error. It makes sense along with an input element.',
}

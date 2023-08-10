import { ComponentMeta, ComponentStory } from '@storybook/react'
import { SearchKitchens } from './SearchKitchens'

export default {
  title: 'src/components/templates/SearchKitchens',
  component: SearchKitchens,
} as ComponentMeta<typeof SearchKitchens>

const Template: ComponentStory<typeof SearchKitchens> = (args) => (
  <SearchKitchens {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}

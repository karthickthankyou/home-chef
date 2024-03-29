import type { Meta, StoryObj } from '@storybook/react'
import { Reveal } from './Reveal'

const meta: Meta<typeof Reveal> = {
  component: Reveal,
}
export default meta

type Story = StoryObj<typeof Reveal>

export const Secret: Story = {
  args: {
    secret: 'This is a secret.',
  },
}

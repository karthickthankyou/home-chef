import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

import { Map } from '../Map'
import { Marker } from './MapMarker'

export default {
  title: 'molecules/MapMarker',
  component: Marker,
} as ComponentMeta<typeof Marker>

const Template: ComponentStory<typeof Marker> = (args) => {
  const [viewState, setViewState] = useState({
    latitude: 80.2,
    longitude: 12.9,
    zoom: 10,
  })
  return (
    <Map initialViewState={viewState}>
      <Marker {...args} />
    </Map>
  )
}

export const Primary = Template.bind({})
Primary.args = {}

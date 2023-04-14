import React, { ReactNode } from 'react'

import { IconMinus, IconPlus } from '@tabler/icons-react'
import { useMap } from 'react-map-gl'

export interface IZoomControlsProps {}

const MapControls = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col overflow-hidden border divide-y rounded shadow-lg divide-primary-800 border-primary-800 backdrop-blur backdrop-filter">
    {children}
  </div>
)

const ZoomIn = () => {
  const { current: map } = useMap()

  return (
    <button
      className=" hover:bg-white"
      type="button"
      onClick={() => map?.zoomIn()}
    >
      <IconPlus className="w-8 h-8 p-1.5 text-black" />
    </button>
  )
}

const ZoomOut = () => {
  const { current: map } = useMap()
  return (
    <button
      className=" hover:bg-white"
      type="button"
      onClick={() => map?.zoomOut()}
    >
      <IconMinus className="w-8 h-8 p-1.5 text-black" />
    </button>
  )
}

MapControls.ZoomIn = ZoomIn
MapControls.ZoomOut = ZoomOut

export default MapControls

export const DefaultZoomControls = () => (
  <MapControls>
    <ZoomIn />
    <ZoomOut />
  </MapControls>
)

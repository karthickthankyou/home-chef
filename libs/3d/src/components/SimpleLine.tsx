import React from 'react'
import { Line } from '@react-three/drei'
import { Vector3 } from 'three'
import { LocationVector } from './HeroSection'

interface DottedLineProps {
  points: LocationVector[]
}

export const SimpleLine: React.FC<DottedLineProps> = ({ points }) => {
  const vertices = points.map((point) => new Vector3(point.x, point.y, point.z))

  return (
    <Line
      points={vertices}
      dashed
      dashSize={0.2}
      gapSize={0.1}
      color={'grey'}
    />
  )
}

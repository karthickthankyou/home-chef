import React, { useMemo } from 'react'
import { useThree } from '@react-three/fiber'
import { Path, Vector2, BufferGeometry, LineDashedMaterial } from 'three'

interface DottedLineProps {
  points: [number, number][]
  curviness?: number
  lineWidth?: number
}

export const DottedLine: React.FC<DottedLineProps> = ({
  points,
  curviness = 20,
  lineWidth = 10,
}) => {
  const { size } = useThree()

  const geometry = useMemo(() => {
    const path = new Path()

    if (points.length > 0) {
      path.moveTo(points[0][0], points[0][1])

      for (let i = 1; i < points.length - 1; i++) {
        const point = points[i]
        const nextPoint = points[i + 1]
        const midX = points[i][0] + (nextPoint[0] - point[0]) * curviness
        const midY = points[i][1] + (nextPoint[1] - point[1]) * curviness

        path.lineTo(point[0], point[1])
        path.quadraticCurveTo(point[0], point[1], midX, midY)
      }

      path.lineTo(points[points.length - 1][0], points[points.length - 1][1])
    }

    const bufferGeometry = new BufferGeometry().setFromPoints(
      path.getPoints(Math.max(size.width, size.height)),
    )
    // bufferGeometry.computeLineDistances() // Required for dashed lines
    return bufferGeometry
  }, [points, size, curviness])

  const material = useMemo(() => {
    return new LineDashedMaterial({
      color: 0xffffff,
      dashSize: 0.1,
      gapSize: 0.05,
      linewidth: lineWidth,
    })
  }, [lineWidth])

  return (
    <line>
      <primitive object={geometry} />
      <primitive object={material} />
    </line>
  )
}

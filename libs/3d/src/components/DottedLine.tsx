import React, { useMemo } from 'react'
import * as THREE from 'three'
import { BufferGeometry, CatmullRomCurve3, Vector3 } from 'three'

interface DottedLineProps {
  points: [number, number][]
}

export const DottedLine: React.FC<DottedLineProps> = ({ points }) => {
  const curve = new CatmullRomCurve3(
    points.map((point) => new Vector3(point[0], point[1], 0)),
  )

  const geometry = useMemo(() => {
    return new BufferGeometry().setFromPoints(curve.getPoints(30))
  }, [curve])

  const material = useMemo(() => {
    return new THREE.LineDashedMaterial({
      color: 0xff0000,
      gapSize: 2,
      dashSize: 0.2,
    })
  }, [])

  return (
    <primitive object={new THREE.Line(geometry, material)} dispose={null} />
  )
}

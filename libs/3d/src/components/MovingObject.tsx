import React, { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector3 } from 'three'
import {
  OrbitControls,
  PerspectiveCamera,
  Plane,
  Image,
} from '@react-three/drei'
import { degToRad } from 'three/src/math/MathUtils'

interface MovingObjectProps {
  path: { x: number; y: number; z: number }[]
  speed: number
}

export const MovingObject: React.FC<MovingObjectProps> = ({ path, speed }) => {
  const objectRef = useRef<THREE.Mesh>(null)
  const { scene } = useThree()
  const pathIndex = useRef(0)
  const currentPos = useRef(new Vector3())

  useEffect(() => {
    if (path.length > 0) {
      currentPos.current.set(path[0].x, path[0].y, path[0].z)
    }
  }, [path])

  useFrame((_, delta) => {
    if (pathIndex.current < path.length - 1) {
      const targetPos = new Vector3(
        path[pathIndex.current + 1].x,
        path[pathIndex.current + 1].y,
        path[pathIndex.current + 1].z,
      )

      const moveDirection = targetPos
        .clone()
        .sub(currentPos.current)
        .normalize()

      const distanceToTravel = speed * delta
      const distanceToTarget = currentPos.current.distanceTo(targetPos)

      if (distanceToTravel < distanceToTarget) {
        currentPos.current.add(moveDirection.multiplyScalar(distanceToTravel))
      } else {
        currentPos.current.copy(targetPos)
        pathIndex.current++
      }

      if (objectRef.current) {
        objectRef.current.position.copy(currentPos.current)
      }
    } else {
      scene.remove(objectRef.current)
    }
  })

  return (
    <mesh ref={objectRef}>
      <Image
        scale={[1, 1]}
        rotation={[degToRad(-90), degToRad(0), degToRad(0)]}
        url="/delivery_circle_icon.png"
        transparent
      />
    </mesh>
  )
}

import React, { forwardRef } from 'react'
import { useLoader } from '@react-three/fiber'
import { TextureLoader, Mesh, PlaneGeometry, MeshStandardMaterial } from 'three'

interface DishIconProps {
  textureURL: string
  position: [number, number, number]
}

export const DishIcon = forwardRef<Mesh, DishIconProps>((props, ref) => {
  const { textureURL, position } = props
  const texture = useLoader(TextureLoader, textureURL)

  return (
    <mesh ref={ref} position={position}>
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  )
})

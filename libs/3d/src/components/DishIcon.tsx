import { useLoader } from '@react-three/fiber'
import { forwardRef } from 'react'
import { Mesh, TextureLoader } from 'three'

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

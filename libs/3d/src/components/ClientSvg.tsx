import React, { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Plane } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'
import { TextureLoader, MeshBasicMaterial, Vector3, Group } from 'three'

export function ClientSideSvg({ position }: { position: Vector3 }) {
  const [material, setMaterial] = useState<MeshBasicMaterial>()

  useEffect(() => {
    const svgUrl = '../assets/dish_icon.svg'
    const loader = new SVGLoader()

    loader.load(
      svgUrl,
      (data) => {
        const group = new Group()

        for (const path of data.paths) {
          const shapes = path.toShapes(true)
          for (const shape of shapes) {
            const geometry = new ShapeBufferGeometry(shape)
            const material = new MeshBasicMaterial({
              color: path.color,
              side: 2,
              depthWrite: false,
            })
            const mesh = new THREE.Mesh(geometry, material)
            group.add(mesh)
          }
        }
        setGroup(group)
      },
      undefined,
      (error) => console.error(error),
    )
  }, [])

  if (!material) {
    return null
  }

  return (
    <mesh position={position} scale={[1, 1, 1]}>
      <Plane args={[1, 1, 1]} />
      <primitive object={material} />
    </mesh>
  )
}

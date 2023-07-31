import React, { useEffect, useRef, useState } from 'react'

import { Canvas, useFrame } from '@react-three/fiber'
import { SimpleLine } from './SimpleLine'
import { OrbitControls, PerspectiveCamera, Image } from '@react-three/drei'
import { Spawner } from './Spawner'
import { Vector3 } from 'three'
import { degToRad } from 'three/src/math/MathUtils'

export type LocationVector = { x: number; y: number; z: number }
export type Path = { id: number; positions: LocationVector[] }

function nearestMultipleOf5(location: LocationVector): LocationVector {
  const xMultiple = Math.round(location.x / 5) * 5
  const yMultiple = Math.round(location.y / 5) * 5

  return { x: xMultiple, y: yMultiple, z: location.z }
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function generateLocations(n: number, range = 20): LocationVector[] {
  const locations: LocationVector[] = []

  for (let i = 0; i < n; i++) {
    let x: number
    let y: number
    let z: number
    do {
      x = randomInt(-range, range) // Change the range as needed
      z = randomInt(-range, range) // Change the range as needed
    } while (x % 5 === 0 || z % 5 === 0)

    const randomZ = randomInt(0, 2)
    y = randomZ === 0 ? randomInt(0, range) : 0 // Change the range as needed
    locations.push({ x, y, z })
  }

  return locations
}

function createShortestPath(
  start: LocationVector,
  end: LocationVector,
): LocationVector[] {
  const path: LocationVector[] = [start]

  // Move along the x-axis
  if (end.x !== start.x)
    path.push({
      x: end.x,
      y: start.y,
      z: start.z,
    })

  // Move along the y-axis
  if (end.y !== start.y)
    path.push({
      x: end.x,
      y: end.y,
      z: start.z,
    })
  if (end.z !== start.z)
    path.push({
      x: end.x,
      y: end.y,
      z: end.z,
    })

  return path
}

function createPath(
  kitchen: LocationVector,
  home: LocationVector,
): LocationVector[] {
  const path: LocationVector[] = []
  console.log('createPath: ', kitchen, home)
  const kitchensNearest = nearestMultipleOf5(kitchen)
  const homesNearest = nearestMultipleOf5(home)
  path.push(...createShortestPath(kitchen, kitchensNearest))
  path.push(
    ...createShortestPath(kitchensNearest, { ...kitchensNearest, y: 0 }),
  )
  path.push(
    ...createShortestPath(
      { ...kitchensNearest, y: 0 },
      { ...homesNearest, y: 0 },
    ),
  )
  path.push(...createShortestPath({ ...homesNearest, y: 0 }, homesNearest))
  path.push(...createShortestPath(homesNearest, home))
  // Step 1: Find the home's nearest
  // Step 1: Move to the nearest location where the x and y are multiples of 5. (dont change z)
  // Step 1: Move to the nearest location where the x and y are multiples of 5.

  return path
}

const defaultKitchens = [{ x: 1, y: 0, z: 1 }]
const defaultHomes = [
  { x: 3, y: 0, z: 1 },
  { x: -1, y: 0, z: 1 },
  { x: 1, y: 0, z: 3 },
  { x: 1, y: 0, z: -1 },
]

const MovingTopDownCamera = ({ speed = 0.002 }) => {
  const [x, setX] = useState(-20)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>()

  useFrame(() => {
    if (cameraRef?.current?.position) {
      setX((prevX) => {
        if (prevX >= 20) {
          return -20
        }
        return prevX + speed
      })

      cameraRef.current.position.x = x
      cameraRef.current.position.y = 5
      cameraRef.current.position.z = 0
      //   cameraRef.current.rotation.y += speed / 2
      cameraRef.current.rotation.x = 90

      //   cameraRef.current.lookAt(x, 2, 0) // Slightly look down
    }
  })

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      fov={40}
      near={0.1}
      far={1000}
      position={[-20, 0, 0]}
    />
  )
}
const MovingAroundCityCamera = ({ speed = 0.002 }) => {
  const [x, setX] = useState(-20)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>()

  useFrame(() => {
    if (cameraRef?.current?.position) {
      setX((prevX) => {
        if (prevX >= 20) {
          return -20
        }
        return prevX + speed
      })

      cameraRef.current.position.x = x
      cameraRef.current.position.y = 5
      cameraRef.current.position.z = -30
      cameraRef.current.lookAt(x, 0, 0) // Slightly look down
    }
  })

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      fov={30}
      near={0.1}
      far={1000}
      position={[-20, 4, -30]}
    />
  )
}

const RotatingCamera = ({ speed = 0.001 }) => {
  const [angle, setAngle] = useState(0)
  const [fov, setFov] = useState(30)

  const cameraRef = useRef<THREE.PerspectiveCamera | null>()

  useFrame((state, delta) => {
    if (cameraRef.current) {
      setAngle((prevAngle) => (prevAngle + speed) % (2 * Math.PI))

      const radius = 40

      cameraRef.current.position.x = radius * Math.sin(angle)
      cameraRef.current.position.z = radius * Math.cos(angle)
      cameraRef.current.position.y = 40
      cameraRef.current.lookAt(1, 0, 1)

      const minFov = 10
      const maxFov = 40
      const amplitude = (maxFov - minFov) / 2
      const oscillationSpeed = 0.05
      setFov(
        minFov +
          amplitude +
          Math.sin(state.clock.elapsedTime * oscillationSpeed) * amplitude,
      )
    }
  })

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      fov={fov}
      near={0.1}
      far={1000}
      position={[40, 40, 40]}
    />
  )
}

export const HeroSection: React.FC = () => {
  const dishRef = useRef<THREE.Mesh>(null)

  const kitchens = [{ x: 1, y: 0, z: 1 }].concat(generateLocations(10, 20))
  const homes = [
    { x: 3, y: 0, z: 1 },
    { x: -1, y: 0, z: 1 },
    { x: 1, y: 0, z: 3 },
    { x: 1, y: 0, z: -1 },
  ].concat(generateLocations(40, 60))

  console.log('locations: ', kitchens, homes)

  const paths = [0, 1].map((id) => ({
    id,
    position: createPath(
      kitchens[randomInt(0, kitchens.length - 1)],
      homes[randomInt(0, homes.length - 1)],
    ),
  }))

  for (let i = 0; i < 4; i++) {
    paths.concat({
      id: i + 21,
      position: createPath(defaultKitchens[0], defaultHomes[i]),
    })
  }

  console.log('paths ', paths)

  useEffect(() => {
    // Animation logic to move the dish icon along the path
  }, [])

  let longPath: Path[] = []
  for (let i = 0; i < kitchens.length - 1; i++) {
    const kitchen = kitchens[i]
    const next = kitchens[i + 1]
    const path = { id: i, positions: createPath(kitchen, next) }
    longPath = longPath.concat(path)
  }
  for (let i = 0; i < homes.length - 1; i++) {
    const home = homes[i]
    const next = homes[i + 1]
    const path = { id: i, positions: createPath(home, next) }
    longPath = longPath.concat(path)
  }

  return (
    <div className="h-[calc(100vh-4rem)]">
      <Canvas>
        <RotatingCamera />
        <OrbitControls />

        {kitchens.map((kitchen) => (
          <>
            <Image
              position={new Vector3(kitchen.x, kitchen.y, kitchen.z)}
              rotation={[degToRad(-90), degToRad(0), degToRad(0)]}
              url="/kitchen_icon.png"
              transparent
            />
          </>
        ))}

        {homes.map((home) => (
          <Image
            position={new Vector3(home.x, home.y, home.z)}
            rotation={[degToRad(-90), degToRad(0), degToRad(0)]}
            url="/home_icon.png"
          />
        ))}

        {paths.map((path) => (
          <SimpleLine points={path.position} key={path.id} />
        ))}
        {longPath.map((path) => (
          <SimpleLine points={path.positions} key={path.id} />
        ))}
        {paths.map((path) => (
          <Spawner
            speed={4}
            path={path.position}
            spawnInterval={{
              min: 2,
              max: 20,
            }}
          />
        ))}
      </Canvas>
    </div>
  )
}

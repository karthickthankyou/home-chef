import React, { useEffect, useState } from 'react'
import { MovingObject } from './MovingObject'

interface SpawnerProps {
  path: { x: number; y: number; z: number }[]
  spawnInterval: { min: number; max: number }
  speed: number
}

export const Spawner: React.FC<SpawnerProps> = ({
  path,
  spawnInterval,
  speed,
}) => {
  const [movingObjects, setMovingObjects] = useState<number[]>([])

  const randomInterval = (min: number, max: number): number => {
    return Math.random() * (max - min) + min
  }

  const spawnMovingObject = () => {
    setMovingObjects((prev) => [...prev, Date.now()])
    const nextSpawnTime = randomInterval(spawnInterval.min, spawnInterval.max)
    setTimeout(spawnMovingObject, nextSpawnTime * 1000)
  }

  useEffect(() => {
    const initialSpawnTime = randomInterval(
      spawnInterval.min,
      spawnInterval.max,
    )
    setTimeout(spawnMovingObject, initialSpawnTime * 1000)
  }, [])

  return (
    <>
      {movingObjects.map((id) => (
        <MovingObject key={id} path={path} speed={speed} />
      ))}
    </>
  )
}

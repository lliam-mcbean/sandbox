import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/cannon'

import Lights from './Lights'
import Plane from './Plane'
import Sphere from './Sphere'
import Bubble from './Bubble'

export default function Scene() {
    let bubbles = []
    for (let i = 0; i < 10; i++) {
        bubbles.push(<Bubble />)
    }
  return (
    <Canvas shadows camera={{position: [0,50,20]}}>
        <Lights />
        <Physics gravity={[0,-100,0]}>
            <Plane />
            <Sphere />
            {bubbles}
        </Physics>
    </Canvas>
  )
}

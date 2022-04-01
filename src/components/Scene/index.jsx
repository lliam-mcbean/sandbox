import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/cannon'

import Lights from './Lights'
import Plane from './Plane'
import Sphere from './Sphere'
import Bubble from './Bubble'
import { OrbitControls } from '@react-three/drei'

export default function Scene() {
    // let bubbles = []
    // for (let i = 0; i < 10; i++) {
    //     bubbles.push(<Bubble />)
    // }
  return (
    <Canvas shadows camera={{position: [0,50,20], far: 1000}}>
        <Lights />
        <Physics>
            <Plane />
            <Sphere />
        </Physics>
        <OrbitControls />
    </Canvas>
  )
}

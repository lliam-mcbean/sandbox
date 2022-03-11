import { useSphere } from '@react-three/cannon'
import { useFrame } from '@react-three/fiber'
import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'

export default function Bubble({vec = new THREE.Vector3()}) {
    const ballPosition = useRef()
    const bubblePosition = useRef()
    const [ref, api] = useSphere(() => ({
        args: [1,10,10],
        mass: 10,
        position: [0,10,0],
        material: {
            restitution: 1
        }
    }))

    

    useFrame(({camera}) => {
        ballPosition.current = [
            camera.position.x,
            camera.position.y - 75,
            camera.position.z - 15
        ]
        console.log('this is the camera position', camera.position)
        console.log('this is the force vector towards the ball', vec.toArray())
        console.log('this is the ball position', ballPosition.current)
        console.log('this is the bubble position', bubblePosition.current)
        api.applyForce(vec.multiplyScalar(20).toArray(), bubblePosition.current)
    })

    useEffect(() => api.position.subscribe((p) => {
        vec.set(1 / (((ballPosition.current[0] - p[0]) * 0.01) + 0.01), 0, 1 / (((ballPosition.current[2] - p[2]) * 0.01) + 0.01))
        bubblePosition.current = p
    }), [api]) 
    return (
        <mesh position={[Math.random() * 20,Math.random() * 20,Math.random() * 20]} ref={ref} >
            <sphereGeometry />
            <meshBasicMaterial color={0x0000ff} />
        </mesh>
    )
}

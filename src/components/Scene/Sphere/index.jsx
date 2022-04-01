import { useSphere } from '@react-three/cannon'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { Vector3 } from 'three'
import useCamera from '../../../hooks/useCamera'


export default function Sphere({vec = new Vector3()}) {
  const [ref, api] = useSphere(() => ({ args: [5,10,10], mass: 10, position: [0, 10, 0], material: { friction: 0, restitution: 0}}))
  const force = useRef([0,0,0])
  const position = useRef([0,0,0])

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (position.current[1] < 5 && e.code === 'Space') {
        api.applyLocalImpulse([0,500,0], [0,0,0])
      }
    })
    return () => {
      document.removeEventListener('keydown')
    }
  }, [])

  useEffect(() => {
    api.position.subscribe((e) => {
      position.current = e
    })
  }, [api])

  useFrame(({mouse, camera}) => {
    console.log(position.current[1])
    force.current = [(mouse.x * 300), (position.current[1] - 5) * -70, (-mouse.y * 300)]
    // FOLLOW CAM
    //camera.position.set(position.current[0] - 20, position.current[1] + 50, position.current[2] + 20)
    api.applyLocalForce(force.current, [0,0,0])
    // api.applyLocalForce(vec.multiplyScalar(-1).toArray(), [0,0,0])
  })
  
  return (
    <mesh castShadow receiveShadow ref={ref}>
      <sphereGeometry args={[5,100,100]}/>
      <meshStandardMaterial color='lightblue'/>
    </mesh>
  )
}
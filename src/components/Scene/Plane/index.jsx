import { usePlane } from '@react-three/cannon'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Plane(props) {
  const [ref_1, api_1] = usePlane(() => ({ args: [100,100,100], rotation: [-Math.PI / 2, 0, 0], material: { friction: 10}, ...props }))
  usePlane(() => ({ args: [100,100,100], position: [0,50,-50], material: { friction: 10}, ...props }))
  usePlane(() => ({ args: [100,100,100], position: [0,50,50], rotation: [-Math.PI, 0, 0], material: { friction: 10}, ...props }))
  usePlane(() => ({ args: [100,100,100], position: [50,50,0], rotation: [0, -Math.PI / 2, 0], material: { friction: 10}, ...props }))
  usePlane(() => ({ args: [100,100,100], position: [-50,50,0], rotation: [0, Math.PI / 2, 0], material: { friction: 10}, ...props }))

  useFrame(({mouse}) => {
    api_1.rotation.set(-Math.PI / 2 - mouse.y * 0.2, mouse.x * 0.2, 0)
  })
  
  return (
    <>
    <mesh receiveShadow ref={ref_1}>
      <planeGeometry args={[100,100]} />
      <meshStandardMaterial color='white' side={THREE.DoubleSide}/>
    </mesh>
    </>
  )
}
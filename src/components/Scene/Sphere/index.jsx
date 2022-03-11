import { useSphere } from '@react-three/cannon'
import { useFrame } from '@react-three/fiber'
import { useEffect } from 'react'
import useCamera from '../../../hooks/useCamera'


export default function Sphere(props) {
  const [ref, api] = useSphere(() => ({ args: [5,10,10], mass: 1000, position: [0, 15, 0], material: { friction: 0, restitution: 0}, ...props }))

  const {cameraPosition} = useCamera()

  useEffect(() => {
    api.position.subscribe((e) => {
      cameraPosition.current = [e[0], e[1] + 75, e[2] + 15]
    })

  }, [api])

  useFrame(({camera}) => {
    camera.position.x = cameraPosition.current[0]
    camera.position.y = cameraPosition.current[1] 
    camera.position.z = cameraPosition.current[2] 
  })
  
  return (
    <mesh castShadow receiveShadow ref={ref}>
      <sphereGeometry args={[5,100,100]}/>
      <meshStandardMaterial color='lightblue'/>
    </mesh>
  )
}
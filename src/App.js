import { Canvas, useFrame } from '@react-three/fiber'
import { Physics, usePlane, useSphere } from '@react-three/cannon'
import { softShadows } from '@react-three/drei'
import { useEffect } from 'react'
import * as THREE from 'three'
import useCamera from './hooks/useCamera'

softShadows()

function Plane(props) {
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

function Cube(props) {
  const [ref, api] = useSphere(() => ({ args: [5,10,10], mass: 1000, position: [0, 15, 0], material: { friction: 0}, ...props }))

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

function InnerCube() {
  
  return (
    <>
    <group>
      <Plane isActive={true} color={0xff0000} />
    </group>
    </>
  )
}


function App() {
  const {cameraPosition} = useCamera()

  return (
    <div style={{height: '100vh', width: '100vw'}}>
        <Canvas shadows camera={{position: cameraPosition.current}}>
              <ambientLight intensity={0.4} />
              <directionalLight
                castShadow
                position={[2.5, 8, 5]}
                intensity={1.5}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-camera-far={50}
                shadow-camera-left={-50}
                shadow-camera-right={50}
                shadow-camera-top={50}
                shadow-camera-bottom={-50}
              />
              <pointLight position={[-10, 0, -20]} color="red" intensity={2.5} />
              <pointLight position={[0, -10, 0]} intensity={1.5} />
          <Physics gravity={[0,-100,0]}>
            <InnerCube />
            <Cube />
          </Physics>
        </Canvas>
      </div>
  );
}

export default App;

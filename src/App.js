import { Canvas, useFrame } from '@react-three/fiber'
import { Physics, usePlane, useSphere } from '@react-three/cannon'
import { OrbitControls } from '@react-three/drei'
import { useState, useRef } from 'react'

function Plane(props) {
  const [ref, api] = usePlane(() => ({ rotation: props.rotation, ...props }))
  console.log(props.rotation)
  useFrame(({mouse}) => {
    if(props.isActive) {
      api.rotation.set(-Math.PI / 2 - mouse.y, 0, 0)
    }
    
  })
  return (
    <mesh ref={ref}>
      <planeGeometry args={[100, 100]} />
    </mesh>
  )
}

function Cube(props) {
  const [ref, api] = useSphere(() => ({ mass: 1, position: [0, 5, 0], ...props }))
  
  return (
    <mesh ref={ref}>
      <sphereGeometry />
      <meshNormalMaterial />
    </mesh>
  )
}

function InnerCube() {
  const [rotation, setRotation] = useState([-Math.PI / 2, 0, 0])
  
  return (
    <>
    <group>
      <Plane rotation={rotation} isActive={true}/>
      <Plane rotation={[0,0,0]} position={[0,25,-25]} isActive={false}/>
    </group>
    </>
  )
}

function App() {
  return (
    <div style={{height: '100vh', width: '100vw'}}>
        <Canvas>
          <ambientLight />
          <Physics>
            <InnerCube />
            <Cube />
          </Physics>
          <OrbitControls />
        </Canvas>
      </div>
  );
}

export default App;

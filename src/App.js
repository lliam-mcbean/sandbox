import { Canvas, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Suspense } from 'react'


function App() {
  const gltf = useLoader(GLTFLoader, './untitled.glb')
  return (
    <div style={{height: '100vh', width: '100vw'}}>
        <Canvas>
          <Suspense fallback={null}>
            <primitive object={gltf.scene} />
          </Suspense>
        </Canvas>
      </div>
  );
}

export default App;

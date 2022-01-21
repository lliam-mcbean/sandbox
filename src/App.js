import { useRef } from 'react'
import { Canvas, extend, useFrame } from '@react-three/fiber'
import { shaderMaterial, OrbitControls } from '@react-three/drei'
import glsl from 'babel-plugin-glsl/macro'

const WaveShaderMaterial = new shaderMaterial(
  {time: 0},
  // vertex shader
  // plane to sphere 
  glsl`
    uniform float time;
    
    varying vec2 vUv;

    void main() {
      float lat = ((uv.x) * 2.0) * (3.14 / 180.0);
      float longi = ((uv.y - 0.5)) * (3.14 / 180.0);

      float z = cos(lat + time) * cos(longi + time) * 3.0;
      float x = cos(lat + time) * sin(longi + time) * 3.0;
      float y = sin(lat + time) * 3.0;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(x,y,z, 0.5);
    }
  `
  // glsl`
   
  //   attribute vec3 CubeCoord;

  //   void main() {
  //       vec3 sphereCoord = normalize(CubeCoord);
  //       gl_Position = vec4(mix(CubeCoord, sphereCoord, 0.0), 1.0);
  //   }
  // `,
  // fragment shader
  glsl`
    uniform float time;

    varying vec2 vUv;

    void  main() {
      gl_FragColor = vec4(0.0,1.0,1.0, 1.0);
    }
  `,
)

extend({WaveShaderMaterial})

function Shader() {

  const ref = useRef()

  useFrame(({clock}) => {
    ref.current.time = clock.getElapsedTime()
  })

  return (
    <mesh>
      <boxGeometry args={[1,1,100]} />
      <waveShaderMaterial ref={ref} wireframe={true}/>
    </mesh>
  )
}

function App() {

  return (
    <div style={{height: '100vh', width: '100vw'}}>
        <Canvas camera={{position: [0,0,10]}}>
          <pointLight position={[10,10,10]} />
          <Shader />
          <OrbitControls />
        </Canvas>
      </div>
  );
}

export default App;

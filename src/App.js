import { useRef } from 'react'
import { Canvas, extend, useFrame } from '@react-three/fiber'
import { shaderMaterial, OrbitControls } from '@react-three/drei'
import glsl from 'babel-plugin-glsl/macro'

const WaveShaderMaterial = new shaderMaterial(
  {time: 0,
  sinTime: 0,
  cosTime: 0},
  // vertex shader
  // plane to sphere
  glsl`
    uniform float time;

    varying vec2 vUv;

    #define PI 3.14159265359

    void main() {
      vUv = uv;

      float phi = (1. - uv.y) * PI;
      float theta = uv.x * PI * 2. + PI;
      float radius = 1.;

      float sinPhiRadius = sin( phi ) * radius;

      float x = sinPhiRadius * sin( theta );
      float y = cos( phi ) * radius;
      float z = sinPhiRadius * cos( theta );

      gl_Position = projectionMatrix * modelViewMatrix * vec4(mix(position, vec3(x,y,z), 1.), 1.0);
    }
  `,
  // cube to sphere 
  // glsl`
  //   uniform float cosTime;
  //   uniform float sinTime;
  //   varying vec2 vUv;
  //   varying vec3 posTime;

  //   void main() {
  //     vUv = uv;
      
  //     vec3 spherePos = normalize(position) * sinTime;
  //     vec3 cubePos = position * cosTime;
  //     posTime = spherePos + cubePos;

  //     gl_Position = projectionMatrix * modelViewMatrix * vec4(posTime, 1.0);
  //   }
  // `,
  // fragment shader
  glsl`
    varying vec2 vUv;

    #define PI 3.14159265359

    void main()
    {
        vec2 st = vUv;
        //Re-map vUv, so its 0 at the center and 1 or -1 on the edges
        st = st * 2. -1.;

        float d = length( abs(st) - 0.5 );
        //Same d:
        // d = distance( abs(st) - 0.5, vec2(0.0) );

        //returns the fractional part of x. This is calculated as x - floor(x)
        float dField = fract(d*10.0);

        gl_FragColor = vec4(vUv, 1.0, 1.0);
    }
  `,
)

extend({WaveShaderMaterial})

function Shader() {

  const ref = useRef()

  useFrame(({clock}) => {
    ref.current.time = clock.getElapsedTime()
    ref.current.cosTime = Math.abs(Math.cos(clock.getElapsedTime()))
    ref.current.sinTime = Math.abs(Math.sin(clock.getElapsedTime()))
  })

  return (
    <mesh>
      <planeGeometry args={[1,1,100]} />
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

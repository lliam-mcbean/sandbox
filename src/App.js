import { useRef } from 'react'
import { Canvas, extend, useFrame } from '@react-three/fiber'
import { shaderMaterial, OrbitControls } from '@react-three/drei'
import glsl from 'babel-plugin-glsl/macro'

const WaveShaderMaterial = new shaderMaterial(
  {time: 0,
  sinTime: 0,
  cosTime: 0},
  // vertex shader
  // waves on a plane
  // glsl`
  // varying vec2 vUv;

  // uniform float sinTime;
  // uniform float time;

  // void main() {
  //   vUv = uv;
  //   float waveX = sin(uv.y * 500.0 + time) * 0.01;
  //   float waveY = sin(uv.x * 500.0 + time) * 0.01;
    
  //   gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x, position.y, mix(waveX, waveY, 0.5), 1.0);
  // }
  // `,
  // plane to sphere
  glsl`
    uniform float time;
    uniform float sinTime;
    uniform float cosTime;

    varying vec2 vUv;

    #define PI 3.14159265359

    void main() {
      vUv = uv;
      
      float lat = (uv.x - 0.5) * 2.0 * PI;
      float lon = (uv.y - 0.5) * PI;

      float x = cos(lat) * cos(lon) * 0.5;
      float y = sin(lat) * 0.5;
      float z = cos(lat) * sin(lon) * 0.5;

      float r = sqrt(x*x + y*y + z*z )
      float theta = atan2(sqrt(x*x + y*y) , z)
      float phi = atan2(y,x)

      float newx = r^n * sin(theta*n) * cos(phi*n)
      float newy = r^n * sin(theta*n) * sin(phi*n)
      float newz = r^n * cos(theta*n)

      gl_Position = projectionMatrix * modelViewMatrix * vec4(mix(position, vec3(newx,newy,newz), cosTime), 1.0);
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
      
  //     vec3 spherePos = normalize(position) * 2.0 * sinTime;
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
        st = st * 2. -1.;
        float d = length( abs(st) - 0.5 );
        float dField = fract(d*10.0);
        gl_FragColor = vec4(0.0,0.0, dField, 1.0);
    }
  `,
)

extend({WaveShaderMaterial})

function Shader() {

  const ref = useRef()

  useFrame(({clock}) => {
    ref.current.time = clock.getElapsedTime()
    ref.current.cosTime = Math.abs(Math.cos(clock.getElapsedTime() / 5))
    ref.current.sinTime = Math.abs(Math.sin(clock.getElapsedTime() / 5))
  })

  return (
    <mesh>
      <planeGeometry args={[1,1,10,10]} />
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

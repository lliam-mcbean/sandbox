import { usePlane } from '@react-three/cannon'
import { useTexture, shaderMaterial } from '@react-three/drei'
import { useFrame, extend } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'

import glsl from 'babel-plugin-glsl/macro'


const GlobeShader = shaderMaterial(
  {time: 0,
  sinTime: 0,
  cosTime: 0},
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
  `
)

extend({ GlobeShader })
  

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
      <globeShader ref={ref} wireframe={true}/>
    </mesh>
  )
}


export default function Plane(props) {
  const [ref, api] = usePlane(() => ({ args: [100,50,50], rotation: [-Math.PI / 2, 0, 0], material: { friction: 10, restitution: 0}  }))
  const rotation = useRef([0,0,0])

  const texture = useTexture('https://i.imgur.com/X8Z5Qn7.jpg')
  
  return (
    <>
    {/* <mesh receiveShadow ref={ref}>
      <planeGeometry args={[100,100,1,1]} />
      <meshStandardMaterial color='indianred' />
    </mesh> */}
    <Shader />
    </>
  )
}
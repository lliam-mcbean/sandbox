import { Canvas, extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import glsl from 'babel-plugin-glsl/macro'

const WaveShaderMaterial = new shaderMaterial(
  {},
  // vertex shader
  glsl`
    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // fragment shader
  glsl`
    void main() {
      gl_FragColor = vec4(0.0, 1.0, 1.0, 1.0);
    }
  `
)

extend({WaveShaderMaterial})

function App() {
  return (
    <div style={{height: '100vh', width: '100vw'}}>
        <Canvas>
          <pointLight position={[10,10,10]} />
          <mesh>
            <planeBufferGeometry args={[3,5]} />
            <waveShaderMaterial />
          </mesh>
        </Canvas>
      </div>
  );
}

export default App;

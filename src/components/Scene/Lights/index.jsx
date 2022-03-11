import React from 'react'
// import { useRef } from 'react'
// import { useHelper } from '@react-three/drei'
// import { DirectionalLightHelper } from 'three'

export default function Lights() {
    // const directionalLight = useRef()

    // useHelper(directionalLight, DirectionalLightHelper, "hotpink")
  return (
    <>
        <ambientLight intensity={0.4} />
        <directionalLight intensity={0.6} position={[70, 40, 0]} castShadow   
        shadow-mapSize-height={512}
        shadow-mapSize-width={512} 
        shadow-camera-bottom={-50}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        />
        <directionalLight intensity={0.6} position={[0, 40, 70]} castShadow   
        shadow-mapSize-height={512}
        shadow-mapSize-width={512} 
        shadow-camera-bottom={-50}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        />
        <pointLight position={[0, 10, 0]} intensity={0.5} color="red" />
    </>
  )
}

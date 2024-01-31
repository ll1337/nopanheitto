import React, { useRef, useState } from "react";
import { useFrame, useThree } from "react-three-fiber";
import { useGLTF, OrthographicCamera } from "@react-three/drei";
import { MeshStandardMaterial } from "three";

export function Dice({ isSpinning, setSpinning, ...props }) {
  const group = useRef();
  const { nodes } = useGLTF("/dice.gltf");
  const [dotShowing, setDotShowing] = useState(false);
  const { size } = useThree();
  const scaleFactor =
    size.width < size.height ? size.width / 10000 : size.height / 10000;
  console.log(scaleFactor);

  // Create material for the white base
  const whiteMaterial = new MeshStandardMaterial({ emissive: "white" });

  nodes.Cube_2.material = whiteMaterial;
  nodes.Cube.material = whiteMaterial;

  const handleMaterial = (material) => {
    material.color.set(0x000000); // Set color to black
    material.emissive.set(0x000000); // Set emissive color to black
  };

  const setEllipsesBlack = () => {
    for (const nodeName in nodes) {
      if (nodeName.startsWith("Ellipse")) {
        const ellipse = nodes[nodeName];
        if (ellipse && ellipse.material) {
          handleMaterial(ellipse.material);
        }
      }
    }
  };

  setEllipsesBlack(); // Call the function to set ellipses to black

  useFrame((state, delta) => {
    if (isSpinning) {
      group.current.rotation.z += 0.1;
      group.current.rotation.y += 0.1;
      setDotShowing(true);
    } else {
      group.current.rotation.set(0, 0, 0);
      setDotShowing(false);
    }
  });

  // const handleDiceClick = () => {
  //   setSpinning(true);
  //   // group.current.scale.set(3, 3, 3);
  // };

  return (
    <group {...props} dispose={null} ref={group} className="dice">
      <group scale={scaleFactor} className="dice">
        <directionalLight
          castShadow
          position={[900, 900, 900]}
          intensity={5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        {dotShowing && (
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Ellipse_24.geometry}
            material={nodes.Ellipse_24.material}
            position={[0.417, 0.807, 51]}
          />
        )}

        <pointLight
          intensity={1}
          decay={2}
          distance={2000}
          position={[0, -149.45, 151.234]}
        />
        <pointLight
          intensity={1}
          decay={2}
          distance={2000}
          position={[0, -146.981, -152.657]}
        />
        <pointLight
          intensity={1}
          decay={2}
          distance={2000}
          position={[0, 149.283, -149.394]}
        />
        <pointLight
          intensity={1}
          decay={2}
          distance={2000}
          position={[0, 150.182, 151.308]}
        />
        <pointLight
          intensity={1}
          decay={2}
          distance={2000}
          position={[-150.347, 0, 0]}
        />
        <pointLight
          intensity={1}
          decay={2}
          distance={2000}
          position={[148.802, 0, 0]}
        />
        <pointLight
          intensity={1}
          decay={2}
          distance={2000}
          position={[0, 0, -150.737]}
        />
        <pointLight
          intensity={1}
          decay={2}
          distance={2000}
          position={[0, -147.511, 0]}
        />
        <pointLight
          intensity={1}
          decay={2}
          distance={2000}
          position={[0.375, 1.29, 151.895]}
        />
        <pointLight
          intensity={1}
          decay={2}
          distance={2000}
          position={[0, 150.977, 0.007]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ellipse_23.geometry}
          material={nodes.Ellipse_23.material}
          position={[-51, -16, -14]}
          rotation={[0, -Math.PI / 2, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ellipse_22.geometry}
          material={nodes.Ellipse_22.material}
          position={[-51, 13, 15]}
          rotation={[0, -Math.PI / 2, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ellipse_18.geometry}
          material={nodes.Ellipse_18.material}
          position={[51, 22, 24]}
          rotation={[0, Math.PI / 2, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ellipse_19.geometry}
          material={nodes.Ellipse_19.material}
          position={[51, 22, -25]}
          rotation={[0, Math.PI / 2, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ellipse_20.geometry}
          material={nodes.Ellipse_20.material}
          position={[51, -25, -25]}
          rotation={[0, Math.PI / 2, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ellipse_21.geometry}
          material={nodes.Ellipse_21.material}
          position={[51, -25, 22]}
          rotation={[0, Math.PI / 2, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ellipse_17.geometry}
          material={nodes.Ellipse_17.material}
          position={[51, 0, -1]}
          rotation={[0, Math.PI / 2, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ellipse_15.geometry}
          material={nodes.Ellipse_15.material}
          position={[-23, -28, -51]}
          rotation={[-Math.PI, 0, -Math.PI]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ellipse_13.geometry}
          material={nodes.Ellipse_13.material}
          position={[-23, -2, -51]}
          rotation={[-Math.PI, 0, -Math.PI]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ellipse_12.geometry}
          material={nodes.Ellipse_12.material}
          position={[-23, 27, -51]}
          rotation={[-Math.PI, 0, -Math.PI]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ellipse_16.geometry}
          material={nodes.Ellipse_16.material}
          position={[24, -29, -51]}
          rotation={[-Math.PI, 0, -Math.PI]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ellipse_14.geometry}
          material={nodes.Ellipse_14.material}
          position={[24, -3, -51]}
          rotation={[-Math.PI, 0, -Math.PI]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ellipse_11.geometry}
          material={nodes.Ellipse_11.material}
          position={[24, 26, -51]}
          rotation={[-Math.PI, 0, -Math.PI]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ellipse_9.geometry}
          material={nodes.Ellipse_9.material}
          position={[0, -51, 1]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ellipse_10.geometry}
          material={nodes.Ellipse_10.material}
          position={[27, -51, -27]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ellipse_8.geometry}
          material={nodes.Ellipse_8.material}
          position={[-29, -51, 26]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ellipse_2.geometry}
          material={nodes.Ellipse_2.material}
          position={[21.478, 51.909, 19.705]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ellipse_4.geometry}
          material={nodes.Ellipse_4.material}
          position={[21.076, 51.909, -16.889]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ellipse_3.geometry}
          material={nodes.Ellipse_3.material}
          position={[-20.215, 51.909, -16.889]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ellipse.geometry}
          material={nodes.Ellipse.material}
          position={[-19.215, 51.909, 19.705]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_2.geometry}
          material={nodes.Cube_2.material}
          rotation={[0, Math.PI / 2, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          material={nodes.Cube.material}
          rotation={[0, Math.PI / 2, 0]}
        />
        <OrthographicCamera
          makeDefault={false}
          far={100000}
          near={0}
          position={[-48.577, 8.367, 990.21]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/dice.gltf");

export default Dice;

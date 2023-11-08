import React, { useRef, useState } from 'react';
import { useFrame } from 'react-three-fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';


const DiceAnimation = () => {
  const group = useRef();
  const [isSpinning, setSpinning] = useState(false);

  // Load the dice model
  const gltfLoader = new GLTFLoader();
  gltfLoader.load('untitled.gltf', (gltf) => {
    group.current.add(gltf.scene);
  });

  // Animation logic using the useFrame hook
  // useFrame((state, delta) => {
  //   // Your animation logic here
  //   // group.current.rotation.x += 0.01;
  //   // group.current.rotation.y += 0.01;
  //   group.current.scale.set(1, 1, 1); 
  // });

  // const handleDiceClick = () => {
  //   console.log('Dice clicked!');
  //   // Add your logic for handling the dice click event
  // };


  useFrame((state, delta) => {
    if (isSpinning) {
      // group.current.rotation.x += 1;
      // group.current.rotation.y += 1;
      group.current.rotation.z += 0.1;
      console.log(group.current.rotation.z);
    }
  });

  const handleDiceClick = () => {
    setSpinning(true);

    // Stop spinning after 2 seconds
    setTimeout(() => {
      setSpinning(false);
    }, 2140);
  }

  return(
    <mesh>

      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <group ref={group} onClick={handleDiceClick}/>

    </mesh>

  );

};

export default DiceAnimation;

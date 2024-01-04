import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from 'react-three-fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';

//group.current.scale.set(1, 1, 1);

const DiceAnimation = () => {
  const group = useRef();
  const [isSpinning, setSpinning] = useState(false);

  // Load the dice model
  useEffect(() => {
    const gltfLoader = new GLTFLoader();

    gltfLoader.load('dice.gltf', (gltf) => {
      group.current.add(gltf.scene);
    });

  }, [])
  


  useFrame((state, delta) => {
    if (isSpinning) {
      group.current.rotation.z += 0.1;
      group.current.rotation.y += 0.1;
    
    }
  });

  const handleDiceClick = () => {
    setSpinning(true);

    // Stop spinning after about 2 seconds
    setTimeout(() => {
      setSpinning(false);
      group.current.rotation.set(0, 0, 0);
    }, 2140);
  }

  return(
    <mesh>

      <group ref={group} onClick={handleDiceClick}/>

    </mesh>

  );

};

export default DiceAnimation;

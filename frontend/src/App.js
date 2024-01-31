import "./App.css";
import { StrictMode } from "react";
import Dice from "./Dice";
import Slogan from "./Slogan";
import RandomCourse from "./RandomCourse";
import { Canvas } from "react-three-fiber";
import { Suspense } from "react";
import React, { useState } from "react";

function App() {
  const [isSpinning, setSpinning] = useState(false);

  const handleButtonClick = () => {
    setSpinning(true);

    // Stop spinning after about 2 seconds
    setTimeout(() => {
      setSpinning(false);
    }, 2100);
  };

  return (
    <StrictMode>
      <div className="App">
        <header className="App-header">💫 Nopanheitto ✨</header>

        <Slogan></Slogan>

        <div className="flex">
          <div className="shadow"></div>
          <Canvas shadows>
            <Suspense>
              <Dice isSpinning={isSpinning} setSpinning={setSpinning} />
            </Suspense>
          </Canvas>
          <RandomCourse onClick={handleButtonClick} />
        </div>
      </div>
    </StrictMode>
  );
}

export default App;

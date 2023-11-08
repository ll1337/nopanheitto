import './App.css';
import { StrictMode } from 'react';
import { motion } from "framer-motion";
import {useState} from 'react';
import DiceAnimation from './DiceAnimation';
import { Canvas } from 'react-three-fiber';


function App() {

  const [diePosition, setDiePosition] = useState(0);
  const [DisplayResults, setDisplayResults] = useState(true);



  const dieOn = () => {
    setDiePosition(diePosition + 270);
    setDiePosition(diePosition - 270);
    console.log(DisplayResults);
    setTimeout(() => {
      setDisplayResults(false);
    }, 900);
  }

  return (
    <StrictMode>
      <div className="App">
        <header className="App-header">

            💫 Nopanheitto ✨
          
        </header>

        
        <div className='flex'>
        <Canvas>
          <DiceAnimation />
        </Canvas>

        </div>
        
      </div>
    </StrictMode>
  );
}

export default App;

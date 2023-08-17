import './App.css';
import { StrictMode } from 'react';
import { motion } from "framer-motion";
import {useState} from 'react';

function App() {

  const [diePosition, setDiePosition] = useState(0);

  const dieOn = () => {
    setDiePosition(diePosition === 0 ? 270 : 0)
    console.log("on");
  }

  return (
    <StrictMode>
      <div className="App">
        <header className="App-header">

            Nopanheitto
          
        </header>

        <motion.div
          className='motiondiv'
          onTap={dieOn}
          animate={{
            scale: [1, 2, 2, 1, 1],
            rotate: [0, 0, diePosition, diePosition, 0],
            borderRadius: ["20%", "20%", "50%", "50%", "20%"],
          }}
        />
        
      </div>
    </StrictMode>
  );
}

export default App;

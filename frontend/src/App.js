import './App.css';
import { StrictMode } from 'react';
import { motion } from "framer-motion";
import {useState} from 'react';


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

        {/* <motion.div
            className='motiondivtwo'
            onTap={dieOn}
            animate={{
              rotate: [0, 0, diePosition, diePosition, 0]
            }}
          >
            <div hidden={DisplayResults} className="centerDiv">periodi</div>
          </motion.div> */}

          <motion.div
            className='motiondiv'
            onTap={dieOn}
            animate={{
              rotate: [0, 0, diePosition, diePosition, 0]
            }}
          >
            <div className="centerDiv" >{DisplayResults? "heitä noppaa!!" : "ongelmalapset 2"}</div>
          </motion.div>

        </div>
        
      </div>
    </StrictMode>
  );
}

export default App;

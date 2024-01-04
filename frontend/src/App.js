import './App.css';
import { StrictMode } from 'react';
import DiceAnimation from './DiceAnimation';
import { Canvas } from 'react-three-fiber';


function App() {

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

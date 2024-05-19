import { useState } from 'react';
import { Gameboard } from './components/Gameboard.jsx';
import Player from './components/Player.jsx';

function App() {
  const [currentPlayer, setCurrentPlayer]=useState(0);
  const handleCurrentPlayer=()=>{
    setCurrentPlayer(currentPlayer === 0 ? 1: 0)
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className='highlight-player'>
          <Player initialName="Player 1" symbol="X" currentPlayer={currentPlayer}/>
          <Player initialName="Player 2" symbol="O" currentPlayer={currentPlayer} />
        </ol>
        <Gameboard handleCurrentPlayer={handleCurrentPlayer} currentPlayer={currentPlayer}/>
      </div>
      LOG
    </main>
  );
}

export default App;

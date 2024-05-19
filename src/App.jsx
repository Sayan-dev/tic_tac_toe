import { useState } from 'react';
import { Gameboard } from './components/Gameboard.jsx';
import Player from './components/Player.jsx';

const board=[
  //     [9747, 1054, 9747]
  [null, null, null],
  [null, null, null],
  [null, null, null]
  ]

function App() {
  const [currentPlayer, setCurrentPlayer]=useState(0);
  const [turns, setTurns] = useState([])
  const gameBoard=[...board]
    const handleOnClick=(x_index, y_index)=>{
      if(gameBoard[x_index][y_index])
        return;
      setCurrentPlayer(currentPlayer === 0 ? 1: 0);
        setTurns((prevState)=>{
          let player_index=0
          if(prevState.length>0 && prevState[prevState.length-1].playerInfo===0)
            {player_index=1}
            const newTurns = {
              indexInfo:{
                row: x_index,
                col: y_index
              },
              playerInfo: player_index
            };
            return [...prevState, newTurns];
        })
    }
    turns.map((turn)=>{
      gameBoard[turn.indexInfo.row][turn.indexInfo.col]=(turn.playerInfo === 0 ? String.fromCodePoint(9747) : String.fromCodePoint(1054))
    })
  
  return (
    <main>
      <div id="game-container">
        <ol id="players" className='highlight-player'>
          <Player initialName="Player 1" symbol="X" currentPlayer={currentPlayer}/>
          <Player initialName="Player 2" symbol="O" currentPlayer={currentPlayer} />
        </ol>
        <Gameboard handleOnClick={handleOnClick} gameBoard={gameBoard}/>
      </div>
      LOG
    </main>
  );
}

export default App;

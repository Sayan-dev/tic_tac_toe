import React, { useState } from 'react';
import { Gameboard } from './components/Gameboard.jsx';
import Player from './components/Player.jsx';
import { WINNING_COMBINATIONS } from './constants/win_combination.js';
import { GameOver } from './components/GameOver.jsx';
import { BOARD, INITIAL_PLAYER_INFO } from './constants/game.js';
import getCurrentPlayer, { createBoard, getWinner } from './helpers/gameHelper.js';

function App() {
  const [playerDetails, setPlayerDetails] = useState(INITIAL_PLAYER_INFO);
  const [turns, setTurns] = useState([]);

  const gameBoard=createBoard(playerDetails, turns, [...BOARD.map((arr)=>[...arr])])
  const currentPlayer= getCurrentPlayer(turns);
  const{isWinner, isDraw} = getWinner(turns, playerDetails, gameBoard);

  const handleOnClick=(x_index, y_index)=>{
      if(gameBoard[x_index][y_index])
        return;
        setTurns((prevState)=>{
            const newTurns = {
              indexInfo:{
                row: x_index,
                col: y_index
              },
              playerInfo: currentPlayer
            };
            return [...prevState, newTurns];
        })
    }

    let showMessage='Game Draw!';
    if (isWinner){
      showMessage=`${playerDetails[turns[turns.length-1].playerInfo].name} won`;
    }
  const handlePlayerEdition=(playerIndex, playerName)=>{
    setPlayerDetails(prevPlayerDetails=>{
      const tempPlayerDetails=[...prevPlayerDetails];
      tempPlayerDetails[playerIndex].name=playerName;
      return tempPlayerDetails;
    })
  }
    
    const onRestart=()=>{
      setTurns([]);
    }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className='highlight-player'>
          {playerDetails.map(
            (item,index)=> (
              <Player 
              key={index}
              id ={index}
              initialName={item.name} 
              symbol={item.symbol} 
              currentPlayer={currentPlayer} 
              onEdit={handlePlayerEdition}/>
            )
          )}
        </ol>
        <Gameboard handleOnClick={handleOnClick} gameBoard={gameBoard}/>
        {(isWinner|| isDraw) && <GameOver 
          message={showMessage} 
          restart={onRestart}/>}
      </div>
      
    </main>
  );
}

export default App;

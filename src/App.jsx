import React, { useState } from 'react';
import { Gameboard } from './components/Gameboard.jsx';
import Player from './components/Player.jsx';
import { WINNING_COMBINATIONS } from './constants/win_combination.js';
import { GameOver } from './components/GameOver.jsx';
import { BOARD, INITIAL_PLAYER_INFO } from './constants/game.js';

function App() {
  const [playerDetails, setPlayerDetails] = useState(INITIAL_PLAYER_INFO);
  const [currentPlayer, setCurrentPlayer]=useState(0);
  const [turns, setTurns] = useState([]);

  let showMessage='Game Draw!';
  const handlePlayerEdition=(playerIndex, playerName)=>{
    setPlayerDetails(prevPlayerDetails=>{
      const tempPlayerDetails=[...prevPlayerDetails];
      tempPlayerDetails[playerIndex].name=playerName;
      return tempPlayerDetails;
    })
  }
  const gameBoard=[...BOARD.map((arr)=>[...arr])]
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
    let isWinner = false;
    let draw = false;
    function getWinner()
    {
      if(turns.length < 5) return;

      const validSymbol=
      turns[turns.length-1].playerInfo === 0 ?
      String.fromCodePoint(9747): String.fromCodePoint(1054);
      for(let combo of WINNING_COMBINATIONS) {
        let wining = true;
        for(let item of combo){
          if(gameBoard[item.row][item.column] !== validSymbol){
            wining = false;
            break;          
          }
        }
        if(wining){
          isWinner=true;
          showMessage=`${playerDetails[turns[turns.length-1].playerInfo].name} won`;
          break;
        }
        else{
          if(turns.length === 9)
          draw=true;
        }
      }
    }
    getWinner();
    if(isWinner){
      console.log("You won!")
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
        {(isWinner|| draw) && <GameOver 
          message={showMessage} 
          restart={onRestart}/>}
      </div>
      
    </main>
  );
}

export default App;

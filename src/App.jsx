import React, { useState } from 'react';
import { Gameboard } from './components/Gameboard.jsx';
import Player from './components/Player.jsx';
import { WINNING_COMBINATIONS } from './win/win_combination.js';

const board=[
  //     [9747, 1054, 9747]
  [null, null, null],
  [null, null, null],
  [null, null, null]
  ]

  //const getBoard(turns){
 //
 // }
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
    let isWinner = false;

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
          break;
        }
      }
    }
    getWinner();
    if(isWinner){
      console.log("You won!")
    }
    //   WINNING_COMBINATIONS.map(combo=>{
    //     combo.map(
    //       (item=> {
    //         gameBoard[item.row][item.column] === validSymbol
    //       })
    //     )
    //   })
    // }
  
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

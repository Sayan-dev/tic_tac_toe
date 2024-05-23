import { WINNING_COMBINATIONS } from "../constants/win_combination";

export default function getCurrentPlayer(turns){
    const currentPlayer= ((turns.length>0 && turns[turns.length- 1].playerInfo ===0) ? 1 : 0)
    return currentPlayer;
}

export function createBoard(playerDetails, turns, showBoard){
    turns.map((turn)=>{
        showBoard[turn.indexInfo.row][turn.indexInfo.col]=
            playerDetails[turn.playerInfo].symbol;
      })
    return showBoard;
}

export function getWinner(turns, playerDetails, gameBoard )
{
    let isWinner=false;
    let isDraw =false;
  if(turns.length >4){
    const validSymbol=
  playerDetails[turns[turns.length-1].playerInfo].symbol
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
    else{
      if(turns.length === 9)
      isDraw=true;
    }
  }
  }  
  return{ isWinner, isDraw};
}
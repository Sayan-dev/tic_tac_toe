import { useState } from "react";
import { Gameboard } from "./components/Gameboard.jsx";
import Player from "./components/Player.jsx";
import { WINNING_COMBINATIONS } from "./constants/winning_condition.js";
import GameOver from "./components/GameOver.jsx";
import { INITIAL_BOARD, INITIAL_PLAYER_DATA } from "./constants/game.js";

// [{boardInfo: {row: row_id, column: column_id}, playerInfo: 1 },{boardInfo: {row: row_id, column: column_id}, playerInfo: 0 }]

// [
//     { name: "Player 1", symbol: String.fromCodePoint(9747) },
//     { name: "Player 2", symbol: String.fromCodePoint(1054) },
// ];

function App() {
    const [playerDetails, setPlayerDetails] = useState(INITIAL_PLAYER_DATA);
    const [turns, setTurns] = useState([]);
    const [currentPlayer, setCurrentPlayer] = useState(0);

    const gameBoard = [...INITIAL_BOARD.map((arr) => [...arr])];

    turns.map((turn) => {
        gameBoard[turn.boardInfo.row][turn.boardInfo.column] =
            turn.playerInfo === 0
                ? String.fromCodePoint(9747)
                : String.fromCodePoint(1054);
    });
    const handleSetPlayerDetails = (playerIndex, playerName) => {
        setPlayerDetails((previousPlayerDetails) => {
            const newPlayerDetails = [...previousPlayerDetails];
            newPlayerDetails[playerIndex].name = playerName;
            return newPlayerDetails;
        });
    };

    const handleOnClick = (x_index, y_index) => {
        if (gameBoard[x_index][y_index]) return;
        setCurrentPlayer(currentPlayer === 0 ? 1 : 0);
        setTurns((prevTurns) => {
            let currentPlayer = 0;

            if (
                prevTurns.length > 0 &&
                prevTurns[prevTurns.length - 1].playerInfo === 0
            ) {
                currentPlayer = 1;
            }

            const newTurn = {
                boardInfo: {
                    row: x_index,
                    column: y_index,
                },
                playerInfo: currentPlayer,
            };

            const updatedTurns = [...prevTurns, newTurn];

            return updatedTurns;

            // const newTurns = [...prevState.map((row) => [...row])];
            // if (!newTurns[x_index][y_index]) {
            //     newTurns[x_index][y_index] =
            //         currentPlayer === 0
            //             ? String.fromCodePoint(9747)
            //             : String.fromCodePoint(1054);
            // }
        });
    };

    let isWinner = false;
    let isDraw = false;

    const getWinner = () => {
        if (turns.length <= 4) return;
        const validSymbol =
            turns[turns.length - 1].playerInfo === 0
                ? String.fromCodePoint(9747)
                : String.fromCodePoint(1054);
        for (let combo of WINNING_COMBINATIONS) {
            let winning = true;
            for (let item of combo) {
                if (gameBoard[item.row][item.column] !== validSymbol) {
                    winning = false;
                    break;
                }
            }
            if (winning) {
                isWinner = true;
                break;
            }
        }
        if (!isWinner && turns.length >= 9) {
            isDraw = true;
        }
    };
    getWinner();
    if (isWinner) {
        console.log("Winner is: ", turns[turns.length - 1].playerInfo);
    }

    const onRestart = () => {
        setTurns([]);
        setCurrentPlayer(0);
    };
    return (
        <main>
            <div id="game-container">
                {(isWinner || isDraw) && (
                    <GameOver
                        isWinner={isWinner}
                        players={playerDetails}
                        playerIndex={turns[turns.length - 1].playerInfo}
                        onRestart={onRestart}
                    />
                )}
                <ol id="players" className="highlight-player">
                    {playerDetails.map((player, index) => (
                        <Player
                            key={index}
                            id={index}
                            onEdit={handleSetPlayerDetails}
                            initialName={player.name}
                            symbol={player.symbol}
                            currentPlayer={currentPlayer}
                        />
                    ))}
                </ol>
                <Gameboard
                    gameBoard={gameBoard}
                    handleOnClick={handleOnClick}
                />
            </div>
            LOG
        </main>
    );
}

export default App;

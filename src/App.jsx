import { useState } from "react";
import { Gameboard } from "./components/Gameboard.jsx";
import Player from "./components/Player.jsx";
import { WINNING_COMBINATIONS } from "./constants/winning_condition.js";
import GameOver from "./components/GameOver.jsx";
import { INITIAL_BOARD, INITIAL_PLAYER_DATA } from "./constants/game.js";
import { createBoard, getCurrentPlayer, getWinner } from "./helpers/game.js";

function App() {
    const [playerDetails, setPlayerDetails] = useState(INITIAL_PLAYER_DATA);
    const [turns, setTurns] = useState([]);

    const currentPlayer = getCurrentPlayer(turns);

    const gameBoard = createBoard(
        turns,
        [...INITIAL_BOARD.map((arr) => [...arr])],
        playerDetails
    );

    const { isWinner, isDraw } = getWinner(turns, gameBoard, playerDetails);

    const handleSetPlayerDetails = (playerIndex, playerName) => {
        setPlayerDetails((previousPlayerDetails) => {
            const newPlayerDetails = [...previousPlayerDetails];
            newPlayerDetails[playerIndex].name = playerName;
            return newPlayerDetails;
        });
    };

    const handleOnClick = (x_index, y_index) => {
        if (gameBoard[x_index][y_index]) return;

        setTurns((prevTurns) => {
            // let currentPlayer = getCurrentPlayer(prevTurns);

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

    if (isWinner) {
        console.log("Winner is: ", turns[turns.length - 1].playerInfo);
    }

    const onRestart = () => {
        setTurns([]);
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

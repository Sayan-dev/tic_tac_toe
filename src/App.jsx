import { useState } from "react";
import { Gameboard } from "./components/Gameboard.jsx";
import Player from "./components/Player.jsx";

// [{boardInfo: {row: row_id, column: column_id}, playerInfo: 1 },{boardInfo: {row: row_id, column: column_id}, playerInfo: 0 }]

const board = [
    //     [9747, 1054, 9747]
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

function App() {
    const [turns, setTurns] = useState([]);
    const [currentPlayer, setCurrentPlayer] = useState(0);

    const gameBoard = board;

    turns.map((turn) => {
        gameBoard[turn.boardInfo.row][turn.boardInfo.column] =
            turn.playerInfo === 0
                ? String.fromCodePoint(9747)
                : String.fromCodePoint(1054);
    });

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
    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player
                        initialName="Player 1"
                        symbol="X"
                        currentPlayer={currentPlayer}
                    />
                    <Player
                        initialName="Player 2"
                        symbol="O"
                        currentPlayer={currentPlayer}
                    />
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

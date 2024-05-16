import React, { useState } from "react";

const board = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

export const Gameboard = ({ handleSelectSquare, activePlayer }) => {
    const [turns, setTurns] = useState(board);

    const handleOnClick = (row_index, col_index) => {
        // Get previous turns as previousState
        setTurns((previousState) => {
            const newTurns = [...previousState.map((row) => [...row])];
            newTurns[row_index][col_index] = activePlayer;

            return newTurns;
        });
        handleSelectSquare();
    };

    return (
        <ol id="game-board">
            {turns.map((row, row_index) => {
                return (
                    <li>
                        <ol>
                            {row.map((col, col_index) => {
                                return (
                                    <li>
                                        <div
                                            onClick={() =>
                                                handleOnClick(
                                                    row_index,
                                                    col_index
                                                )
                                            }
                                            className="game-cell"
                                        >
                                            {String.fromCharCode(col)}
                                        </div>
                                    </li>
                                );
                            })}
                        </ol>
                    </li>
                );
            })}
        </ol>
    );
};

import React, { useState } from "react";

// [{boardInfo: {row: row_id, column: column_id}, playerInfo: 1 },{boardInfo: {row: row_id, column: column_id}, playerInfo: 0 }]

export const Gameboard = ({ handleOnClick, gameBoard }) => {
    return (
        <ol id="game-board">
            {gameBoard.map((row, row_index) => {
                return (
                    <li>
                        <ol>
                            {row.map((col, col_index) => {
                                return (
                                    <li>
                                        <div
                                            className="game-cell"
                                            onClick={() =>
                                                handleOnClick(
                                                    row_index,
                                                    col_index
                                                )
                                            }
                                        >
                                            {col}
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

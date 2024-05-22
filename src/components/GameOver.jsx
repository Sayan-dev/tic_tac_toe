import React from "react";

const GameOver = ({ players, playerIndex, onRestart, isWinner }) => {
    return (
        <div id="game-over">
            <h2>Game Over</h2>
            <p>
                {isWinner
                    ? `The winner is ${players[playerIndex].name}`
                    : "It's a draw"}
            </p>
            <button onClick={onRestart}>Play again</button>
        </div>
    );
};

export default GameOver;

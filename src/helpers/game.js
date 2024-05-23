import { INITIAL_PLAYER_DATA } from "../constants/game";
import { WINNING_COMBINATIONS } from "../constants/winning_condition";

export function getCurrentPlayer(turns) {
    if (turns.length === 0) return 0;
    const currentPlayer = turns[turns.length - 1].playerInfo === 0 ? 1 : 0;
    return currentPlayer;
}

export function createBoard(turns, gameBoard, playerDetails) {
    turns.map((turn) => {
        gameBoard[turn.boardInfo.row][turn.boardInfo.column] =
            // INITIAL_PLAYER_DATA[turn.playerInfo].symbol;
            playerDetails[turn.playerInfo].symbol;
    });
    return gameBoard;
}

export const getWinner = (turns, playerDetails, gameBoard) => {
    let isWinner = false;
    let isDraw = false;

    if (turns.length > 4) {
        const validSymbol =
            // INITIAL_PLAYER_DATA[turn.playerInfo].symbol;
            playerDetails[turns[turns.length - 1].playerInfo].symbol;
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
    }

    return { isWinner, isDraw };
};

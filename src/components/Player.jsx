import { useState } from "react";

export default function Player({
    initialName,
    symbol,
    currentPlayer,
    onEdit,
    id,
}) {
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick() {
        onEdit(id, playerName);
        setIsEditing((editing) => !editing);
    }

    function handleChange(event) {
        setPlayerName(event.target.value);
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>;
    // let btnCaption = 'Edit';

    if (isEditing) {
        editablePlayerName = (
            <input
                type="text"
                required
                value={playerName}
                onChange={handleChange}
            />
        );
        // btnCaption = 'Save';
    }

    function activePlayer() {
        return (symbol === "X" && currentPlayer === 0) ||
            (symbol === "O" && currentPlayer === 1)
            ? "active"
            : null;
    }

    return (
        <li className={activePlayer()}>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>
                {isEditing ? "Save" : "Edit"}
            </button>
        </li>
    );
}

import { useState } from "react";
import { Gameboard } from "./components/Gameboard.jsx";
import Player from "./components/Player.jsx";

function App() {
    const [activePlayer, setActivePlayer] = useState(9747);

    function handleSelectSquare() {
        setActivePlayer((curActivePlayer) =>
            curActivePlayer === 9747 ? 1054 : 9747
        );
    }

    return (
        <main>
            <div id="game-container">
                <ol id="players">
                    <Player initialName="Player 1" symbol={9747} />
                    <Player initialName="Player 2" symbol={1054} />
                </ol>
                <Gameboard
                    handleSelectSquare={handleSelectSquare}
                    activePlayer={activePlayer}
                />
            </div>
            LOG
        </main>
    );
}

export default App;

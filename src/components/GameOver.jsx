import React from 'react'

export const GameOver = ({message, restart}) => {
  return (
    <div id='game-over'>
        <h2>GameOver</h2>
        <p>{message}</p>
        <p>Start new Game?</p>
        <button onClick={restart}>Yes</button>
    </div>
  )
}

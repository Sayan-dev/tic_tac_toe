import React from 'react'

const board=[
    [9747, 1054, 9747],
    [9747, 1054, 1054],
    [1054, 9747, 9747]
]

export const Gameboard = () => {
  return (
    <ol id='game-board'>
        {board.map((row)=>{
            return (
                <li>
                    <ol>
                        {row.map((col)=>
                            {
                                return (
                                    <li>
                                        <div className='game-cell'>{String.fromCodePoint(col)}</div>
                                    </li>
                                )
                            }
                        )}
                    </ol>
                </li>
            )
        }
        )}
    </ol>
  )
}

import React, { useState } from 'react'

const board=[
//     [9747, 1054, 9747]
[null, null, null],
[null, null, null],
[null, null, null]
]

export const Gameboard = () => {
    const [turns, setTurns] = useState(board)
    const handleOnClick=(x_index, y_index)=>{
        setTurns((prevState)=>{
            const newTurns = [...prevState.map(row=> [...row])]
            newTurns[x_index][y_index]= '*';
            return newTurns;
        })
    }
  return (
    <ol id='game-board'>
        {turns.map((row, row_index)=>{
            return (
                <li>
                    <ol>
                        {row.map((col, col_index)=>
                            {
                                return (
                                    <li>
                                        <div className='game-cell' onClick={()=>handleOnClick(row_index, col_index)}>{col}</div>
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

import { React, useState } from 'react'
import Board from './board'

const Game = () => {
    const [xIsNext, setXIsNext] = useState(true);
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const currentSquares = history[history.length - 1];

    const handlePlay = (nextSquares) => {
        setHistory([...history, nextSquares]);
        setXIsNext(!xIsNext);
    }
    return (
        <div className='game'>
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <ol>ooo</ol>
            </div>
        </div>
    )
}

export default Game

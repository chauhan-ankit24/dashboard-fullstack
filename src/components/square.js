import React from 'react'
import './square.css'

const Square = ({ value, onSquareClick }) => {
    return (
        <div>
            <button className='custom-btn btn-10' onClick={onSquareClick}>{value}</button>
        </div>
    )
}

export default Square

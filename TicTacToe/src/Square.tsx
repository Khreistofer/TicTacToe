import './Square.css'

function Square({value, onSquareClick, stopGame}: any)
{
    return (
        <button className='square' onClick={onSquareClick} disabled={stopGame}>{value}</button>
    )
}

export default Square;
import { useState } from 'react'
import './Board.css'
import Square from './Square.tsx'
import Controls from './Controls.tsx'

function Board()
{
    const [isVsComputer, setIsVsComputer] = useState(false);
    const [xIsNext, setXIsNext] = useState(true)
    const [squares, setSquares] = useState(Array(9).fill(null))
    const [gameStopped, setGameStopped] = useState(false)
    const [winner, setWinner] = useState<null | string>(null)

    function handleClick(i: any)
    {
        const nextSquares = squares.slice()
        if(nextSquares[i] != null)
            return
        if(xIsNext)
            nextSquares[i] = "X"
        else
            nextSquares[i] = "O"

        setSquares(nextSquares)
        let result = checkWin(xIsNext ? "X" : "O", i)
        console.log(result)
        if(result == null)
            setGameStopped(true)
            setWinner("draw")
        if(result)
        {
            setGameStopped(true)
            setWinner(xIsNext? "X" : "O")
        }
        else
        {
            setXIsNext(!xIsNext)

            if (isVsComputer && xIsNext) {
                setTimeout(() => makeComputerMove(nextSquares), 500);
            }
        }
    }
    
    function checkWin(player: string, idx: number)
    {
        const checkSquares = squares.slice();
        checkSquares[idx] = player;
        // horizontally
        for(let i = 0; i < 7; i+=3)
        {
            if(checkSquares[i] == player && checkSquares[i+1] == player && checkSquares[i+2] == player)
            {
                console.log(i)
                console.log(checkSquares[i], checkSquares[i+1], checkSquares[i+2])
                console.log('horizontal')
                return true;
            }
        }
        // vertically
        for(let i = 0; i < 3 ; i++)
        {
            if(checkSquares[i] == player && checkSquares[i+3] == player && checkSquares[i+6] == player)
            {
                console.log('vertical')
                return true
            } 
        }
        // diagonals
        if((checkSquares[0] == player && checkSquares[4] == player && checkSquares[8] == player) ||
           (checkSquares[2] == player && checkSquares[4] == player && checkSquares[6] == player))
        {
            console.log('diagonal')
            return true
        }
        
        if(!checkSquares.includes(null))
            return null;
        // no winner yet
        return false
    }

    function handleToggleMode() {
        setIsVsComputer(prev => !prev);
        handleReset()
    }

    function handleReset() {
        setSquares(Array(9).fill(null));
        setXIsNext(true);
        setWinner(null);
        setGameStopped(false);
    }

    function makeComputerMove(currentBoard: any) {
    const emptySquares = currentBoard
        .map((val: any, idx: any) => (val === null ? idx : null))
        .filter((val: any) => val !== null);

    if (emptySquares.length === 0) return;

    const randomIndex =
        emptySquares[Math.floor(Math.random() * emptySquares.length)];

    const newBoard = [...currentBoard];
    newBoard[randomIndex] = "O";

    setSquares(newBoard);
    setXIsNext(true);
    }
    
    return (
        <div className='board'>
            <Controls
                isVsComputer={isVsComputer}
                onToggleMode={handleToggleMode}
                onReset={handleReset}
            />
            <div className='board-row'>
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} stopGame={gameStopped}/>
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} stopGame={gameStopped}/>
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} stopGame={gameStopped}/>
            </div>
            <div className='board-row'>
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} stopGame={gameStopped}/>
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} stopGame={gameStopped}/>
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} stopGame={gameStopped}/>
            </div>
            <div className='board-row'>
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} stopGame={gameStopped}/>
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} stopGame={gameStopped}/>
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} stopGame={gameStopped}/>
            </div>
            <div className="winner" hidden={!gameStopped}>
                {winner === "draw"
                    ? "It's a draw!"
                    : winner
                    ? `Winner: ${winner}`
                    : ""}
            </div>
        </div>
    )
}

export default Board

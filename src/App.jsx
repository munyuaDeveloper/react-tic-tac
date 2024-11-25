import { useState } from "react";
import "./App.css";

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (squares[index] || winner) return;

    const newSquares = squares.slice();
    newSquares[index] = xIsNext ? "X" : "O";
    setXIsNext(!xIsNext);
    setSquares(newSquares);

    const gameWinner = calculateWinner(newSquares);

    if (gameWinner) setWinner(gameWinner);
  };

  const calculateWinner = (squares) => {
    const winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const line of winningLines) {
      const [a, b, c] = line;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setWinner(null);
    setXIsNext(true);
  };

  return (
    <>
      <div className="container mx-auto mt-40">
        <div className="w-[400px] mx-auto">
          {!winner && (
            <h2 className="text-center m-2">
              Next Player: {xIsNext ? "X" : "O"}
            </h2>
          )}
          {winner && (
            <h2 className="text-center m-2">
              Winner: {winner}
            </h2>
          )}
          <button
            className="bg-slate-300 block mx-auto rounded px-3 py-1 mb-3"
            onClick={resetGame}
          >
            Reset Game
          </button>
        </div>

        {[0, 1, 2].map((row) => (
          <div
            key={row}
            className="w-[400px] h-[150px] bg-slate-300 flex mx-auto"
          >
            {[0, 1, 2].map((col) => {
              const index = row * 3 + col;
              return (
                <button
                  onClick={() => handleClick(index)}
                  key={col}
                  className="w-[133px] border-2 flex items-center justify-center"
                >
                  {squares[index]}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;

import React from "react";
import "./../styles/Board.css";
import "./../styles/Tile.css";

interface GameBoardProps {
  board: number[][];
}

const GameBoard: React.FC<GameBoardProps> = ({ board }) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`tile value-${cell}`}
          >
            {cell !== 0 ? cell : ""}
          </div>
        ))
      )}
    </div>
  );
};

export default GameBoard;

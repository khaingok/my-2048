import React from "react";
import Tile from "./Tile";
import "../styles/Board.css";

interface BoardProps {
  board: number[][];
}

export default function Board({ board }: BoardProps) {
  return (
    <div className="board">
      {board.map((row, rIdx) =>
        row.map((value, cIdx) => (
          <Tile key={`${rIdx}-${cIdx}`} value={value} />
        ))
      )}
    </div>
  );
}

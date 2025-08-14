import React from "react";

interface Props {
  score: number;
  bestScore: number;
}

const Scoreboard: React.FC<Props> = ({ score, bestScore }) => {
  return (
    <div className="scoreboard">
      <div>
        <span className="scoreboard-label">Score</span>
        <span className="scoreboard-value">{score}</span>
      </div>
      <div>
        <span className="scoreboard-label">Best</span>
        <span className="scoreboard-value">{bestScore}</span>
      </div>
    </div>
  );
};

export default Scoreboard;
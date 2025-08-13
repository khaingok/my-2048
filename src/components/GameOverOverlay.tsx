import React from "react";
import "../styles/GameOverOverlay.css";

interface Props {
  onRestart: () => void;
  score?: number;
  bestScore?: number;
}

const GameOverOverlay: React.FC<Props> = ({ onRestart, score, bestScore }) => {
  return (
    <div className="game-over-overlay">
      <div>
        <div className="game-over-title">Game Over</div>
        {typeof score === "number" && (
          <div className="game-over-score">Score: {score}</div>
        )}
        {typeof bestScore === "number" && (
          <div className="game-over-best">Best: {bestScore}</div>
        )}
        <button className="game-over-restart-btn" onClick={onRestart}>
          Play Again
        </button>
      </div>
    </div>
  );
};
export default GameOverOverlay;

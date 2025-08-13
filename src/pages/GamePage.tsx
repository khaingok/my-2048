import React from "react";
import Board from "../components/Board";
import Controls from "../components/Controls";
import Scoreboard from "../components/Scoreboard";
import GameOverOverlay from "../components/GameOverOverlay";
import { useGameLogic } from "../hooks/useGameLogic";
import "../styles/Board.css";
import "../styles/Tile.css";

export default function GamePage() {
  const { board, score, bestScore, gameOver, restart, saveGame, loadGame } = useGameLogic();

  return (
    <div style={{ textAlign: "center", marginTop: "2rem", position: "relative" }}>
      <h1>2048 Game</h1>
      <Scoreboard score={score} bestScore={bestScore} />
      <div style={{ display: "inline-block", position: "relative" }}>
        <Board board={board} />
      </div>
      <Controls onRestart={restart} />

      {/* Save & Load Buttons */}
      <div style={{ marginTop: "1rem" }}>
        <button onClick={saveGame} style={{ marginRight: "0.5rem" }}>💾 Save Game</button>
        <button onClick={loadGame}>📂 Load Game</button>
      </div>

      {gameOver && <GameOverOverlay onRestart={restart} score={score} bestScore={bestScore} />}
    </div>
  );
}

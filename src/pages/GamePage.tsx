import React from "react";
import Board from "../components/Board";
import Controls from "../components/Controls";
import Scoreboard from "../components/Scoreboard";
import GameOverOverlay from "../components/GameOverOverlay";
import { useGameLogic } from "../hooks/useGameLogic";
import "../styles/Board.css";
import "../styles/Tile.css";
import "../styles/GamePage.css";
import axios from "axios";

export default function GamePage() {
  const { board, score, bestScore, gameOver, restart, saveGame, loadGame } = useGameLogic();

  React.useEffect(() => {
    if (gameOver) {
      const token = localStorage.getItem("token");
      if (token) {
        axios.post(
          "http://localhost:5000/api/score",
          { score , bestScore },
          { headers: { Authorization: `Bearer ${token}` } }
        ).catch(err => {
          console.error("Failed to save finished score", err);
        });
      }
    }
  }, [gameOver, score, bestScore]);

  return (
    <div className="game-page">
      <div className="score">
        <Scoreboard score={score} bestScore={bestScore} />
      </div>
      <div className="board-container">
        <Board board={board} />
      </div>
      <div className="controls">
        <Controls onRestart={restart} />
      </div>
      <div className="save-load-buttons">
        <button onClick={saveGame}>💾 Save Game</button>
        <button onClick={loadGame}>📂 Load Game</button>
      </div>
      {gameOver && <GameOverOverlay onRestart={restart} score={score} bestScore={bestScore} />}
    </div>
  );
}
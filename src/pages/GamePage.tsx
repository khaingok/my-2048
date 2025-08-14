import React from "react";
import Board from "../components/Board";
import Controls from "../components/Controls";
import Scoreboard from "../components/Scoreboard";
import GameOverOverlay from "../components/GameOverOverlay";
import { useGameLogic } from "../hooks/useGameLogic";
import "../styles/Board.css";
import "../styles/Tile.css";
import "../styles/GamePage.css";
import { postScore, getUserBestScore } from "../services/api";

export default function GamePage() {
  const { board, score, gameOver, restart, saveGame, loadGame } = useGameLogic();
  const [userBestScore, setUserBestScore] = React.useState<number>(0);

  // Fetch best score from DB on mount and after game over
  React.useEffect(() => {
    getUserBestScore()
      .then(data => setUserBestScore(data.bestScore))
      .catch(() => setUserBestScore(0));
  }, []);

  React.useEffect(() => {
    if (gameOver) {
      postScore(score, userBestScore).catch(err => {
        console.error("Failed to save finished score", err);
      });
      // Refetch best score after posting
      getUserBestScore()
        .then(data => setUserBestScore(data.bestScore))
        .catch(() => {});
    }
  }, [gameOver, score, userBestScore]);

  return (
    <div className="game-page">
      <div className="score">
        <Scoreboard score={score} bestScore={userBestScore} />
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
      {gameOver && <GameOverOverlay onRestart={restart} score={score} bestScore={userBestScore} />}
    </div>
  );
}
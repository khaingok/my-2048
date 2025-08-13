import React from "react";

interface Props {
  onRestart: () => void;
  score?: number;
  bestScore?: number;
}

const GameOverOverlay: React.FC<Props> = ({ onRestart, score, bestScore }) => {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.65)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: 320,
          maxWidth: "90%",
          background: "#faf8f2",
          padding: 24,
          borderRadius: 8,
          textAlign: "center",
          boxShadow: "0 6px 18px rgba(0,0,0,0.4)",
        }}
      >
        <h2 style={{ margin: 0, marginBottom: 8, fontSize: 28 }}>Game Over</h2>
        {typeof score === "number" && (
          <div style={{ marginBottom: 8 }}>Score: {score}</div>
        )}
        {typeof bestScore === "number" && (
          <div style={{ marginBottom: 16 }}>Best: {bestScore}</div>
        )}

        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button
            onClick={onRestart}
            style={{
              padding: "10px 18px",
              background: "#f2b179",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverOverlay;

import React from "react";

interface Props {
  score: number;
  bestScore: number;
}

const Scoreboard: React.FC<Props> = ({ score, bestScore }) => {
  return (
    <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 12 }}>
      <div style={{ background: "#eee4da", padding: "8px 12px", borderRadius: 6 }}>
        <div style={{ fontSize: 12 }}>Score</div>
        <div style={{ fontSize: 18, fontWeight: 700 }}>{score}</div>
      </div>
      <div style={{ background: "#bbada0", padding: "8px 12px", borderRadius: 6, color: "#fff" }}>
        <div style={{ fontSize: 12 }}>Best</div>
        <div style={{ fontSize: 18, fontWeight: 700 }}>{bestScore}</div>
      </div>
    </div>
  );
};

export default Scoreboard;

import React from "react";

interface Props {
  onRestart: () => void;
}

const Controls: React.FC<Props> = ({ onRestart }) => {
  return (
    <div style={{ marginTop: 12 }}>
      <button
        onClick={onRestart}
        style={{
          padding: "8px 14px",
          borderRadius: 6,
          border: "none",
          cursor: "pointer",
        }}
      >
        Restart
      </button>
    </div>
  );
};

export default Controls;

import "../styles/Footer.css";
export default function Footer() {
  return (
    <footer className="footer" style={{ fontSize: "0.95em", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.7rem 2rem" }}>
      <div style={{ fontWeight: "bold", color: "#00ffe7", fontSize: "1.1em" }}>
        &copy; 2025 UIT
      </div>
      <div style={{ textAlign: "right", color: "#b2fefa", lineHeight: 1.3 }}>
        2048 Game Project for <span style={{ fontWeight: "bold" }}>CSBU109</span><br />
        <span style={{ color: "#fff" }}>
          Based from <span style={{ fontWeight: "bold", color: "#00ffe7" }}>University of Information Technology (UIT)</span>
        </span>
      </div>
    </footer>
  );
}
import { Link, useNavigate } from "react-router-dom";
import React, { useRef, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import "../styles/Header.css";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(() => {
    const token = localStorage.getItem("token");
    if (!token) return false;
    try {
      const decoded: { exp: number } = jwtDecode(token);
      return decoded.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  });
  const [panelOpen, setPanelOpen] = React.useState(false);

  React.useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoggedIn(false);
        return;
      }
      try {
        const decoded: { exp: number } = jwtDecode(token);
        setIsLoggedIn(decoded.exp * 1000 > Date.now());
      } catch {
        setIsLoggedIn(false);
      }
    };
    window.addEventListener("storage", checkToken);
    const interval = setInterval(checkToken, 1000); // Check every second
    return () => {
      window.removeEventListener("storage", checkToken);
      clearInterval(interval);
    };
  }, []);
  
  const navigate = useNavigate();
  const panelRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleStorage = () => setIsLoggedIn(!!localStorage.getItem("token"));
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Close panel when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setPanelOpen(false);
      }
    }
    if (panelOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [panelOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("storage"));
    navigate("/login");
  };

  const handleAvatarClick = () => setPanelOpen((open) => !open);

  return (
    <header className="header">
      <h1>
        <span
          style={{ cursor: "pointer", color: "#00ffe7", textShadow: "0 0 8px #00ffe7, 0 0 2px #fff" }}
          onClick={() => navigate("/game")}
        >
          2048 Game
        </span>
      </h1>
      <div className="header-actions">
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="header-btn header-login">Login</Link>
            <Link to="/register" className="header-btn header-register">Register</Link>
          </>
        ) : (
          <div className="header-avatar-group" style={{ position: "relative" }}>
            <button
              className="header-avatar"
              title="Profile"
              onClick={handleAvatarClick}
              style={{
                border: "none",
                background: "rgba(255, 255, 255, 1)",
                padding: 0,
                cursor: "pointer"
              }}
            >
              <span role="img" aria-label="avatar">👤</span>
            </button>
            <button className="header-btn header-logout" onClick={handleLogout}>
              Logout
            </button>
            {panelOpen && (
              <div className="header-panel-popup" ref={panelRef}>
                <button className="header-panel-btn" onClick={() => { setPanelOpen(false); navigate("/score"); }}>
                  Score
                </button>
                <button className="header-panel-btn" onClick={() => { setPanelOpen(false); navigate("/privacy"); }}>
                  Privacy
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
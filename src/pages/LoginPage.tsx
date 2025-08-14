import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/LoginPage.css";
const API_BASE = import.meta.env.VITE_API_BASE;

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${API_BASE}/api/users/login`, {
        email,
        password
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data._id);
      window.dispatchEvent(new Event("storage"));
      navigate("/game");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleLogin}>
        <h2 style={{ color: "#00ffe7", marginBottom: "1rem" }}>Login</h2>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Login</button>
        <div style={{ marginTop: "0.5rem", color: "#b2fefa" }}>
          Don't have an account?{" "}
          <span
            className="login-link"
            onClick={() => navigate("/register")}
            style={{ color: "#00ffe7", cursor: "pointer", textDecoration: "underline" }}
          >
            Register here
          </span>
        </div>
      </form>
    </div>
  );
}
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/RegisterPage.css";
const API_BASE = import.meta.env.VITE_API_BASE;


export default function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/api/users/register`, {
        email,
        username,
        password
      });
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-page">
      <form className="register-form" onSubmit={handleRegister}>
        <h2 style={{ color: "#00ffe7", marginBottom: "1rem" }}>Register</h2>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
        <button type="submit">Register</button>
        <div style={{ marginTop: "0.5rem", color: "#b2fefa" }}>
          Already have an account?{" "}
          <span
            className="register-link"
            onClick={() => navigate("/login")}
            style={{ color: "#00ffe7", cursor: "pointer", textDecoration: "underline" }}
          >
            Login here
          </span>
        </div>
      </form>
    </div>
  );
}
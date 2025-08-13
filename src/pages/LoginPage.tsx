import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password
      });

      localStorage.setItem("token", data.token); // Save JWT token
      localStorage.setItem("userId", data.user._id); // Save user ID
      navigate("/game"); // Redirect to game
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>Login</button>
      </form>
      <p>
        Don't have an account?{" "}
        <span style={styles.link} onClick={() => navigate("/register")}>
          Register here
        </span>
      </p>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: { maxWidth: 400, margin: "2rem auto", textAlign: "center" },
  form: { display: "flex", flexDirection: "column", gap: "1rem" },
  input: { padding: "0.5rem", fontSize: "1rem" },
  button: { padding: "0.5rem", fontSize: "1rem", cursor: "pointer" },
  link: { color: "blue", textDecoration: "underline", cursor: "pointer" },
  error: { color: "red" }
};

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/users/register", {
        email,
        username,
        password
      });
      navigate("/login"); // Redirect to login after success
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Register</h2>
      <form onSubmit={handleRegister} style={styles.form}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
          required
        />
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
        <button type="submit" style={styles.button}>Register</button>
      </form>
      <p>
        Already have an account?{" "}
        <span style={styles.link} onClick={() => navigate("/login")}>
          Login here
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

import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";

const Login = ({ onLogin }) => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/user", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      if (onLogin) onLogin();
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div
      className="px-6 py-24 bg-gradient-to-b from-white via-[#f4f4f4] to-[#e5f7f8] text-[#1e1e1e]"
      style={{
        maxWidth: 400,
        margin: "40px auto",
        padding: 24,
        background: "#f9f9f9",
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Login</h1>
      <div style={{ marginBottom: 16, textAlign: "center" }}>
        Don't have an account?{" "}
        <Link to="/signup" style={{ color: "#820808" }}>
          Sign Up
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          id="email"
          name="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          autoComplete="current-email"
          style={{
            width: "100%",
            padding: 8,
            borderRadius: 4,
            border: "1px solid #ccc",
            marginBottom: 8,
          }}
        />
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          autoComplete="current-password"
          style={{
            width: "100%",
            padding: 8,
            borderRadius: 4,
            border: "1px solid #ccc",
            marginBottom: 16,
          }}
        />
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "8px 16px",
            borderRadius: 4,
            border: "1px solid #820808",
            background: "#820808",
            color: "#FFFFFF",
            cursor: "pointer",
            opacity: isLoading ? 0.7 : 1,
          }}
        >
          Login
        </button>
        {error && (
          <div style={{ color: "red", marginTop: 12, textAlign: "center" }}>
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;

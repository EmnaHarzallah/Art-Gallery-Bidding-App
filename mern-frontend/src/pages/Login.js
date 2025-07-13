import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const Login = ({ onLogin }) => {
  const { dispatch } = useAuthContext();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        {
          email,
          password,
        }
      );

      const receivedToken = response.data.token;
      const loggedInUser = response.data.user;

      // stockage local
      localStorage.setItem("token", receivedToken);
      localStorage.setItem("user", JSON.stringify(loggedInUser));

      // mise à jour du contexte
      dispatch({
        type: "LOGIN",
        payload: { user: loggedInUser },
      });

      if (onLogin) onLogin();
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div
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
            color: "#fff",
            cursor: "pointer",
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

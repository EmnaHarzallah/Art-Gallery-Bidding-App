import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Add useNavigate
import { useSignup } from "../hooks/useSignup";
import { useEffect } from "react";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { signup, isLoading, success } = useSignup();
  const navigate = useNavigate(); // Initialize navigate

  const handleRegistration = async (e) => {
    e.preventDefault();
    setError("");

    const res = await axios.post("http://localhost:5000/api/user", {
      username,
      email,
      password,
    });
    localStorage.setItem("token", res.data.token);
  };

  useEffect(() => {
    if (success) {
      navigate("/");
    }
  }, [success, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await signup(username, email, password);
    if (success) {
      navigate("/"); // Redirect to home on success
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
      <h1 style={{ textAlign: "center" }}>Sign Up</h1>
      <div style={{ marginBottom: 16, textAlign: "center" }}>
        Already have an account?{" "}
        <Link to="/login" style={{ color: "#820808" }}>
          Login
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <p>Username </p>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          style={{
            width: "100%",
            padding: 8,
            borderRadius: 4,
            border: "1px solid #ccc",
            marginBottom: 8,
          }}
          required
        />
        <p>Email Address </p>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          style={{
            width: "100%",
            padding: 8,
            borderRadius: 4,
            border: "1px solid #ccc",
            marginBottom: 8,
          }}
          required
        />
        <p>Password </p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          style={{
            width: "100%",
            padding: 8,
            borderRadius: 4,
            border: "1px solid #ccc",
            marginBottom: 16,
          }}
          required
        />
        <p>Confirm your password </p>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          style={{
            width: "100%",
            padding: 8,
            borderRadius: 4,
            border: "1px solid #ccc",
            marginBottom: 16,
          }}
          required
        />
        <button
          type="submit"
          disabled={isLoading}
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
          {isLoading ? "Signing Up..." : "Sign Up"}
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

export default Signup;

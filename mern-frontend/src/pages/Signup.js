import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Add useNavigate
import { useSignup } from "../hooks/useSignup";
import { useEffect } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading, success } = useSignup();
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    if (success) {
      navigate("/");
    }
  }, [success, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await signup(email, password);
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
        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: "100%",
            padding: "8px 16px",
            borderRadius: 4,
            border: "1px solid #007bff",
            background: "#007bff",
            color: "#fff",
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

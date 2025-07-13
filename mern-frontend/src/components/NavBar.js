import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

export default function NavBar({ onLogout }) {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); // Appelle la fonction passée en prop (qui supprime token + user)
    navigate("/login"); // Redirige vers login après logout
  };

  return (
    <nav
      style={{
        background: "#820808",
        padding: "12px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "#fff",
        marginBottom: 32,
        borderRadius: 8,
        maxWidth: 1200,
        margin: "40px auto 0 auto",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      <span style={{ fontWeight: "bold", fontSize: 20 }}>
        Art Gallery Bidding App
      </span>
      <div>
        <Link
          to="/"
          style={{ color: "#fff", marginRight: 16, textDecoration: "none" }}
        >
          Home
        </Link>
        {user && (
          <Link
            to={`/profile/${user.username}`}
            style={{ color: "#fff", marginRight: 16, textDecoration: "none" }}
          >
            Profile
          </Link>
        )}
        <Link
          to="/add-art"
          style={{ color: "#fff", marginRight: 16, textDecoration: "none" }}
        >
          Add Art
        </Link>

        {/* Bouton de logout */}
        <button
          onClick={handleLogout}
          style={{
            background: "transparent",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "inherit",
            padding: 0,
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

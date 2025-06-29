import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Home() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/artworks");
        setArtworks(response.data);
      } catch (err) {
        console.error("Failed to fetch artworks:", err);
        setError("Failed to load artworks. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, [location]);

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", padding: "0 16px" }}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ color: "#820808", marginBottom: "16px" }}>
          Welcome to the Art Gallery Bidding App
        </h1>
        <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
          This application allows you to view, bid on, and manage art pieces in
          a virtual gallery.
        </p>
      </div>

      <h2 style={{ color: "#820808", marginBottom: "24px" }}>All Artworks</h2>

      {loading ? (
        <p>Loading artworks...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : artworks.length === 0 ? (
        <p>No artworks found.</p>
      ) : (
        <div style={{ display: "grid", gap: "24px" }}>
          {artworks.map((artwork) => (
            <div
              key={artwork._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "20px",
                backgroundColor: "#fff",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <h3 style={{ marginTop: 0, color: "#333" }}>{artwork.title}</h3>
              <p style={{ margin: "8px 0" }}>
                <strong>Artist:</strong> {artwork.artist || "Unknown"}
              </p>
              <p style={{ margin: "8px 0" }}>
                <strong>Category:</strong> {artwork.tags}
              </p>
              <p
                style={{
                  margin: "8px 0",
                  fontWeight: "bold",
                  color: "#2e7d32",
                }}
              >
                <strong>Starting Price:</strong> $
                {artwork.startingPrice?.toFixed(2) || "0.00"}
              </p>

              {artwork.imageUrl && (
                <div style={{ marginBottom: "16px", textAlign: "center" }}>
                  <img
                    src={artwork.imageUrl}
                    alt={artwork.title}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "300px",
                      borderRadius: "4px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}

              <button
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#820808",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginTop: "12px",
                }}
              >
                Place Bid
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Home() {
  const [artworks, setArtworks] = useState([]);
  const location = useLocation();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/artworks")
      .then((res) => setArtworks(res.data))
      .catch((err) => console.error("Failed to fetch artworks:", err));
  }, [location]);

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", textAlign: "center" }}>
      <div
        style={{
          maxWidth: 800,
          margin: "32px auto",
          padding: "0 16px",
          textAlign: "center",
        }}
      >
        <h1>Welcome to the Art Gallery Bidding App</h1>
        <p>
          This application allows you to view, bid on, and manage art pieces in
          a virtual gallery.
        </p>
      </div>
      <h1>All Artworks</h1>
      {artworks.length === 0 ? (
        <p>No artworks found.</p>
      ) : (
        artworks.map((artwork) => (
          <div
            key={artwork._id}
            style={{
              marginBottom: 24,
              padding: 16,
              background: "#fff",
              borderRadius: 8,
            }}
          >
            <h3>{artwork.title}</h3>
            <img
              src={artwork.imageURL}
              alt={artwork.title}
              style={{ width: "100%", borderRadius: 4 }}
            />
            <p>Tags: {artwork.tags.join(", ")}</p>
            <p>Starting Price: {artwork.startingPrice}</p>
          </div>
        ))
      )}
    </div>
  );
}

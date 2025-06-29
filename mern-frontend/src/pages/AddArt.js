import React, { useState } from "react";
import axios from "axios";

export default function AddArt() {
  const [artwork, setArtwork] = useState({
    title: "",
    imageUrl: "",
    artist: "",
    tags: "Painting",
    startingPrice: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArtwork((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagsSelect = (tags) => {
    setArtwork((prev) => ({ ...prev, tags }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const submission = {
        ...artwork,
        startingPrice: parseFloat(artwork.startingPrice), // Convert to number
      };

      const response = await axios.post(
        "http://localhost:5000/api/artworks",
        submission
      );
      console.log("Artwork added:", response.data);

      // Reset form after successful submission
      setArtwork({
        title: "",
        imageUrl: "",
        artist: "",
        tags: "Painting",
        startingPrice: "",
      });
    } catch (err) {
      console.error("Error adding artwork:", err);
      setError(err.response?.data?.message || "Failed to add artwork");
    } finally {
      setIsSubmitting(false);
    }
  };

  const tags = ["Painting", "Wall Art", "Sketch", "Digital Art", "Photography"];

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", textAlign: "center" }}>
      <h1 style={{ color: "#820808", marginBottom: "24px" }}>
        Add New Artwork
      </h1>

      {error && (
        <div style={{ color: "red", marginBottom: "16px" }}>{error}</div>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          padding: "24px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={artwork.title}
          onChange={handleChange}
          required
          style={{
            padding: "12px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />

        <input
          type="text"
          name="artist"
          placeholder="Artist"
          value={artwork.artist}
          onChange={handleChange}
          required
          style={{
            padding: "12px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />

        <input
          type="url"
          name="imageUrl"
          placeholder="imageUrl"
          value={artwork.imageUrl}
          onChange={handleChange}
          required
          style={{
            padding: "12px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            margin: "16px 0",
          }}
        >
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handleTagsSelect(tag)}
              style={{
                padding: "10px",
                backgroundColor: artwork.tags === tag ? "#820808" : "#f5f5f5",
                color: artwork.tags === tag ? "white" : "#333",
                border: "1px solid #ddd",
                borderRadius: "4px",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        <input
          type="number"
          name="startingPrice"
          placeholder="100.00"
          value={artwork.startingPrice}
          onChange={handleChange}
          required
          step="0.01"
          min="0"
          style={{
            padding: "12px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: "12px",
            backgroundColor: "#820808",
            color: "#fff",
            borderRadius: "4px",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px",
            marginTop: "16px",
            opacity: isSubmitting ? 0.7 : 1,
          }}
        >
          {isSubmitting ? "Submitting..." : "Add Artwork"}
        </button>
      </form>
    </div>
  );
}

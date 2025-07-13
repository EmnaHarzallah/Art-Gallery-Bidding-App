import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Spinner, Alert } from "react-bootstrap";
import "./Profile.css";
import { useAuthContext } from "../hooks/useAuthContext";

const defaultAvatar = "/default-avatar.png";
const placeholderArtwork = "/place-holder.webp";

export default function Profile() {
  const { user } = useAuthContext();
  const { _id } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const current_id = user ? user._id : null;

  useEffect(() => {
    const fetchProfile = async () => {
      console.log("Fetching profile for:", _id);
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          `http://localhost:3000/api/user/profile/${_id}`,
          { timeout: 5000 }
        );
        console.log("Profile data received:", response.data);
        setProfileData(response.data);
      } catch (err) {
        console.error("Profile fetch error:", err.message || err);
        setError("Failed to load profile. Please try again later.");
      } finally {
        setLoading(false);
        console.log("Loading set to false");
      }
    };

    if (_id) {
      fetchProfile();
    } else {
      setError("No _id provided");
      setLoading(false);
    }
  }, [_id]);

  if (loading) {
    return (
      <div className="profile-loading">
        <Spinner animation="border" />
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="profile-error">
        {error}
      </Alert>
    );
  }

  const own_artworks = profileData?.own_artworks || [];
  const bidding = profileData?.bidding || [];

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src={profileData.avatar || defaultAvatar}
          alt={`${profileData._id}'s avatar`}
          className="profile-avatar"
          onError={(e) => {
            if (e.target.src !== defaultAvatar) {
              e.target.onerror = null;
              e.target.src = defaultAvatar;
            }
          }}
        />
        <div className="profile-info">
          <h2>{profileData.username}</h2>
          <p className="profile-bio">
            {profileData.bio || "This user hasn't written a bio yet."}
          </p>
          {profileData.coins && (
            <div className="profile-coins">
              <span>🪙 {profileData.coins.toLocaleString()} coins</span>
            </div>
          )}
        </div>
      </div>

      <div className="personal-artworks-section">
        <h3>Personal Artwork Collection ({own_artworks.length})</h3>
        {own_artworks.length === 0 ? (
          <div className="empty-artworks">
            <p>No artworks found in this collection.</p>
            {_id === current_id && (
              <Link to="/add-art" className="btn btn-primary">
                Add Another Artwork
              </Link>
            )}
          </div>
        ) : (
          <div className="artworks-grid">
            {own_artworks.map((artwork) => (
              <Link
                to={`/artwork/${artwork._id}`}
                key={artwork._id}
                className="artwork-card"
              >
                <div className="artwork-image-container">
                  <img
                    src={artwork.imageURL}
                    alt={artwork.title}
                    className="artwork-image"
                    onError={(e) => (e.target.src = placeholderArtwork)}
                  />
                </div>
                <div className="artwork-details">
                  <h4 className="artwork-title">{artwork.title}</h4>
                  <p className="artwork-price">
                    {artwork.currentBid
                      ? `Current bid: $${artwork.currentBid.toLocaleString()}`
                      : artwork.startingPrice
                      ? `Starting at $${artwork.startingPrice.toLocaleString()}`
                      : "Not for sale"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="bidding-artworks-section">
        <h3>Bidding Artwork Collection ({bidding.length})</h3>
        {bidding.length === 0 ? (
          <div className="empty-artworks">
            <p>No artworks found in this collection.</p>
            {_id === current_id && (
              <Link to="/add-art" className="btn btn-primary">
                Add Another Artwork
              </Link>
            )}
          </div>
        ) : (
          <div className="artworks-grid">
            {bidding.map((artwork) => (
              <Link
                to={`/artwork/${artwork._id}`}
                key={artwork._id}
                className="artwork-card"
              >
                <div className="artwork-image-container">
                  <img
                    src={artwork.imageURL}
                    alt={artwork.title}
                    className="artwork-image"
                    onError={(e) => (e.target.src = placeholderArtwork)}
                  />
                </div>
                <div className="artwork-details">
                  <h4 className="artwork-title">{artwork.title}</h4>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

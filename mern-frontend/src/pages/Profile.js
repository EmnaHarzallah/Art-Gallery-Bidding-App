import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";

const Profile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user: currentUser, dispatch } = useAuthContext();
  const [profileUser, setProfileUser] = useState(null);
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  // Temporary replacements in Profile.js
  const LoadingSpinner = () => (
    <div className="loading-spinner">Loading...</div>
  );
  const ErrorMessage = ({ message }) => (
    <div className="error-message">{message}</div>
  );
  const defaultAvatar = "/default-avatar.htm"; // Make sure this file exists in your public folder

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Use Promise.all to fetch both data in parallel
        const [userResponse, artworksResponse] = await Promise.all([
          axios.get(`http://localhost:3000/api/users/${userId}`),
          axios.get(`http://localhost:3000/api/artworks?artist=${userId}`),
        ]);

        setProfileUser(userResponse.data);
        setArtworks(artworksResponse.data);

        // Check if current user is following this profile
        if (currentUser) {
          const followStatus = await axios.get(
            `http://localhost:3000/api/users/${userId}/follow-status`,
            {
              headers: { Authorization: `Bearer ${currentUser.token}` },
            }
          );
          setIsFollowing(followStatus.data.isFollowing);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load profile");
        console.error("Profile load error:", err);

        // If unauthorized, redirect to login
        if (err.response?.status === 401) {
          dispatch({ type: "LOGOUT" });
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [userId, currentUser, dispatch, navigate]);

  const handleFollow = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/users/${userId}/follow`,
        {},
        { headers: { Authorization: `Bearer ${currentUser.token}` } }
      );
      setIsFollowing(true);
      setProfileUser((prev) => ({
        ...prev,
        followers: prev.followers + 1,
      }));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to follow user");
    }
  };

  const handleUnfollow = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/users/${userId}/unfollow`,
        {},
        { headers: { Authorization: `Bearer ${currentUser.token}` } }
      );
      setIsFollowing(false);
      setProfileUser((prev) => ({
        ...prev,
        followers: prev.followers - 1,
      }));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to unfollow user");
    }
  };

  if (loading) return <LoadingSpinner fullPage />;
  if (error)
    return (
      <ErrorMessage message={error} onRetry={() => window.location.reload()} />
    );
  if (!profileUser) return <ErrorMessage message="User not found" />;

  const isCurrentUser = currentUser?.id === profileUser._id;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="avatar-section">
          <img
            src={profileUser.avatar || defaultAvatar}
            alt={`${profileUser.name}'s avatar`}
            className="profile-avatar"
            onError={(e) => {
              e.target.src = defaultAvatar;
            }}
          />
          {isCurrentUser ? (
            <button
              className="edit-profile-btn"
              onClick={() => navigate("/settings/profile")}
            >
              Edit Profile
            </button>
          ) : (
            currentUser && (
              <button
                className={`follow-btn ${isFollowing ? "following" : ""}`}
                onClick={isFollowing ? handleUnfollow : handleFollow}
              >
                {isFollowing ? "Following" : "Follow"}
              </button>
            )
          )}
        </div>

        <div className="profile-info">
          <h1>{profileUser.name}</h1>
          <p className="username">@{profileUser.username}</p>
          <p className="bio">{profileUser.bio || "No bio yet"}</p>

          <div className="stats">
            <div className="stat">
              <span className="stat-number">{artworks.length}</span>
              <span className="stat-label">Artworks</span>
            </div>
            <Link to={`/profile/${userId}/followers`} className="stat">
              <span className="stat-number">{profileUser.followers || 0}</span>
              <span className="stat-label">Followers</span>
            </Link>
            <Link to={`/profile/${userId}/following`} className="stat">
              <span className="stat-number">{profileUser.following || 0}</span>
              <span className="stat-label">Following</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="artworks-section">
        <h2>
          {isCurrentUser ? "My Artworks" : `${profileUser.name}'s Artworks`}
        </h2>

        {artworks.length === 0 ? (
          <div className="no-artworks">
            <p>
              {isCurrentUser
                ? "You haven't uploaded any artworks yet"
                : "No artworks yet"}
            </p>
            {isCurrentUser && (
              <Link to="/upload" className="primary-btn">
                Upload your first artwork
              </Link>
            )}
          </div>
        ) : (
          <div className="artworks-grid">
            {artworks.map((artwork) => (
              <div key={artwork._id} className="artwork-card">
                <Link to={`/artwork/${artwork._id}`}>
                  <img
                    src={artwork.imageURL}
                    alt={artwork.title}
                    className="artwork-thumbnail"
                    onError={(e) => {
                      e.target.src = "/placeholder-artwork.jpg";
                    }}
                  />
                  <div className="artwork-info">
                    <h3>{artwork.title}</h3>
                    <p className="price">
                      {artwork.startingPrice
                        ? `$${artwork.startingPrice.toLocaleString()}`
                        : "Not for sale"}
                    </p>
                    {artwork.sold && <span className="sold-badge">Sold</span>}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

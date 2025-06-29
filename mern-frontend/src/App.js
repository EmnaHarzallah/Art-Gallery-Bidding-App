import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AddArt from "./pages/AddArt";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on initial load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    console.log("User logged out");
    // You might want to redirect here: return <Navigate to="/login" />;
  };

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <div>
      <BrowserRouter>
        <ProtectedRoute>
          <NavBar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        </ProtectedRoute>

        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/add-art"
            element={
              <ProtectedRoute>
                <AddArt />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile/:userId"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/" replace />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />

          <Route
            path="/signup"
            element={ <Signup />}}
          />
        </Routes>
        <ProtectedRoute>
          <Footer />
        </ProtectedRoute>
      </BrowserRouter>
    </div>
  );
}

export default App;

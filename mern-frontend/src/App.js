import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <NavBar onLogout={handleLogout} />

      <Routes>
        <Route path="/" element=<Home /> />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

function handleLogout() {
  // Handle logout logic here
  console.log("User logged out");
}

export default App;

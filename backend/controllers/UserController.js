const User = require("../models/User");
const { hashPassword, comparePassword } = require("../utils/PasswordUtils");
const { generateToken } = require("../utils/jwtUtils");
const mongoose = require("mongoose");

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already in use" });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user (only store hashed password)
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Generate JWT
    const token = generateToken({ username: user._id });

    // Prepare response
    const userResponse = {
      _id: user._id,
      username: user.username,
      email: user.email,
      coins: user.coins,
      // Add other public fields as needed
    };

    res.status(201).json({
      success: true,
      user: userResponse,
      token,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      success: false,
      error: "Registration failed. Please try again.",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "There is no User matched to this email",
      });
    }

    // Compare passwords

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: "Incorrect Password",
      });
    }

    // Generate JWT
    const token = generateToken({ username: user._id });

    // Prepare response
    const userResponse = {
      _id: user._id,
      username: user.username,
      email: user.email,
      coins: user.coins,
      // Add other public fields as needed
    };

    res.json({
      success: true,
      user: userResponse,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      error: "Login failed. Please try again.",
    });
  }
};

exports.getUserById = async (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    return res.status(400).json({ message: "Missing user ID" });
  }

  try {
    console.log(`[GET /user/${userId}] Searching...`);

    const user = await User.findById(userId)
      .select("-password -email") // exclure les champs sensibles
      .populate({ path: "own_artworks", select: "title imageUrl" })
      .populate({ path: "bidding", select: "artworkId amount status" });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error in getUserById:", error);
    res.status(500).json({ message: "Server error" });
  }
};

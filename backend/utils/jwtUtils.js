// utils/jwtUtils.js
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "your-very-secure-secret-key";
const EXPIRES_IN = "1h"; // Token expiration time

module.exports = {
  generateToken: (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN });
  },

  verifyToken: (token) => {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      throw new Error("Invalid or expired token");
    }
  },
};

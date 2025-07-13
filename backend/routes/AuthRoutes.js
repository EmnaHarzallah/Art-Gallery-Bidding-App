// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { authenticate } = require("../middleware/AuthMiddleware");

// Public routes
router.post("/signup", UserController.signup);
router.post("/login", UserController.login);

// Protected route example
router.get("/profile/:username", UserController.getUserById);

module.exports = router;

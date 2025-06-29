// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { authenticate } = require("../middleware/AuthMiddleware");

// Public routes
router.post("/register", UserController.register);
router.post("/login", UserController.login);

// Protected route example
router.get("/profile", authenticate, (req, res) => {
  const user = req.user.toObject();
  delete user.password;
  res.json(user);
});

module.exports = router;

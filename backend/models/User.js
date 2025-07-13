// models/User.js
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Artwork = require("./Artwork");
const Schema = mongoose.Schema;
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  coins: {
    type: Number,
    default: 1000,
  },
  own_artworks: {
    type: [Schema.Types.ObjectId],
    ref: "Artwork",
    required: false,
  },
  bidding: {
    type: [Schema.Types.ObjectId],
    ref: "Artwork",
    required: false,
  },
});

module.exports = mongoose.model("User", userSchema);

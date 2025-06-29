const mongoose = require("mongoose");
const { Schema } = mongoose;
// Artwork model schema for MongoDB using Mongoose
// This schema defines the structure of the Artwork documents in the database
const artworkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  startingPrice: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model("Artwork", artworkSchema);

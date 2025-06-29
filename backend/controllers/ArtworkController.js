const artwork = require("../models/Artwork");

exports.createArtwork = async (req, res) => {
  try {
    const { title, imageURL, tags, startingPrice, ownerId } = req.body;
    const newArtwork = new artwork(req.body);
    await newArtwork.save();
    res.status(201).json(newArtwork);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllArtworks = async (req, res) => {
  try {
    const artworks = await artwork.find();
    res.status(200).json(artworks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getArtworkById = async (req, res) => {
  try {
    const artworkItem = await artwork.findById(req.params.id);
    if (!artworkItem) {
      return res.status(404).json({ message: "Artwork not found" });
    }
    res.status(200).json(artworkItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateArtworkById = async (req, res) => {
  try {
    const { title, imageURL, tags, startingPrice, ownerId } = req.body;
    const updatedArtwork = await artwork.findByIdAndUpdate(
      req.params.id,
      { title, imageURL, tags, startingPrice, ownerId },
      { new: true }
    );
    if (!updatedArtwork) {
      return res.status(404).json({ message: "Artwork not found" });
    }
    res.status(200).json(updatedArtwork);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.deleteArtworkById = async (req, res) => {
  try {
    const deletedArtwork = await artwork.findByIdAndDelete(req.params.id);
    if (!deletedArtwork) {
      return res.status(404).json({ message: "Artwork not found" });
    }
    res.status(200).json({ message: "Artwork deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getArtworksByTag = async (req, res) => {
  try {
    const artworks = await artwork.find({ tags: req.params.tag });
    if (artworks.length === 0) {
      return res
        .status(404)
        .json({ message: "No artworks found with this tag" });
    }
    res.status(200).json(artworks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getArtworksByTitle = async (req, res) => {
  try {
    const artworks = await artwork.find({
      title: new RegExp(req.params.title, "i"),
    });
    if (artworks.length === 0) {
      return res
        .status(404)
        .json({ message: "No artworks found with this title" });
    }
    res.status(200).json(artworks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getArtworksByArtist = async (req, res) => {
  try {
    const artworks = await artwork.find({
      artist: new RegExp(req.params.artist, "i"),
    });
    if (artworks.length === 0) {
      return res
        .status(404)
        .json({ message: "No artworks found by this artist" });
    }
    res.status(200).json(artworks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getArtworksByPriceRange = async (req, res) => {
  try {
    const { minPrice, maxPrice } = req.query;
    const artworks = await artwork.find({
      startingPrice: { $gte: minPrice, $lte: maxPrice },
    });
    if (artworks.length === 0) {
      return res
        .status(404)
        .json({ message: "No artworks found in this price range" });
    }
    res.status(200).json(artworks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

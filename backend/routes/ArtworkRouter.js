const router = require("express").Router();
const ArtworkController = require("../controllers/ArtworkController");

// Route to get all artworks
router.get("/", ArtworkController.getAllArtworks);
// Route to get a single artwork by ID
router.get("/:id", ArtworkController.getArtworkById);
// Route to create a new artwork
router.post("/", ArtworkController.createArtwork);
// Route to update an existing artwork by ID
router.put("/:id", ArtworkController.updateArtworkById);
// Route to delete an artwork by ID
router.delete("/:id", ArtworkController.deleteArtworkById);
// Route to search artworks by title
router.get("/search", ArtworkController.getArtworksByTitle);
// Route to get artworks by tag
router.get("/tag/:tag", ArtworkController.getArtworksByTag);
// Route to get artworks by artist
router.get("/artist/:artist", ArtworkController.getArtworksByArtist);
// Route to get artworks by year
router.get("/year/:year", ArtworkController.getArtworksByYear);
// Route to get artworks by coins
router.get("/coins/:coins", ArtworkController.getArtworksByCoins);
// Route to get artworks by price range
router.get("/price/:min/:max", ArtworkController.getArtworksByPriceRange);

module.exports = router;

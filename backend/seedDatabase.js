const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");
const Artwork = require("./models/Artwork"); // Your Mongoose model

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/artgallery")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Generate & insert fake artworks
async function seedArtworks(count = 10) {
  try {
    const artworks = Array.from({ length: count }, () => ({
      title: faker.lorem.words(3),
      artist: faker.lorem.words(10),
      imageUrl: faker.image.urlLoremFlickr({ category: "art" }),
      tags: faker.helpers.arrayElement([
        "Painting",
        "Wall Art",
        "Sketch",
        "Digital Art",
        "Photography",
      ]),
      startingPrice: faker.number.float({
        min: 50,
        max: 5000,
        precision: 0.01,
      }),
      createdAt: faker.date.past(),
    }));

    await Artwork.insertMany(artworks);
    console.log(`Inserted ${count} fake artworks!`);
  } catch (err) {
    console.error("Error seeding data:", err);
  } finally {
    mongoose.disconnect();
  }
}

seedArtworks(20); // Generate 20 fake artworks

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/auth");

// Load environment variables from .env file
dotenv.config();

// MongoDB connection
const uri = process.env.MONGO_URI || "mongodb://localhost:27017/han"; // Fallback to local MongoDB if MONGO_URI is not set

mongoose
  .connect(uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Connection error:", err));

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS

// Routes
app.use("/api/auth", authRoutes);

// Start the server
const PORT = process.env.PORT || 5002; // Use a different port if 5001 is in use
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
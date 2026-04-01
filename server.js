import express from "express";
import cors from "cors"; // ← Added this
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL; 

// ✅ Middlewares
app.use(cors()); // Allows frontend to connect
app.use(express.json()); // Parses JSON body
app.use("/uploads", express.static("uploads"));

// route mounting
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

const start = async () => {
  try {
    // Connect to MongoDB
    const connectionDB = await mongoose.connect(MONGO_URL);
    console.log(`✅ MongoDB Connected! Host: ${connectionDB.connection.host}`);

    // Start server
    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`❌ Something went wrong: ${error.message}`);
  }
};

start();

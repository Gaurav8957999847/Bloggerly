import express from "express";
import cors from "cors"; // ← Added this
import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs"; // added this
import path from "path"; // added this
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import errorHandler from "./middlewares/errorMiddleware.js";

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


app.get("/", async (req, res) => {
  res.send("This is the root page");
});

// Error handling middleware
app.use(errorHandler);

const start = async () => {
  try {
    // Ensure the uploads directory exists
    const uploadDir = path.join(process.cwd(), "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
      console.log("✅ 'uploads' directory created");
    }

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

import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/Upload.js";
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/postController.js";

const router = express.Router();

// Public routes
router.get("/", getPosts);
router.get("/:id", getPostById);

// Protected routes (only logged-in users)
router.post("/", protect, upload.single("image"), createPost);
router.put("/:id", protect, upload.single("image"), updatePost);
router.delete("/:id", protect, deletePost);

export default router;

import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/upload.js";
import { postValidation } from "../middlewares/validator.js";
import { validationResult } from "express-validator";

import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/postController.js";

const router = express.Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Public routes
router.get("/", getPosts);
router.get("/:id", getPostById);

// Protected routes with validation
router.post(
  "/",
  protect,
  upload.single("image"),
  postValidation,
  validate,
  createPost,
);
router.put(
  "/:id",
  protect,
  upload.single("image"),
  postValidation,
  validate,
  updatePost,
);
router.delete("/:id", protect, deletePost);

export default router;

import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String, // will store path like "/uploads/post-123.jpg"
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const Post = mongoose.model("Post", postSchema);

export default Post;

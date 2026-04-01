import Post from "../models/Post.js";

// Create Post (with optional image)
export const createPost = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const post = await Post.create({
      title,
      content,
      category,
      image,
      author: req.user._id,
    });

    res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get All Posts (with pagination & category filter)
export const getPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10, category } = req.query;

    const query = category ? { category } : {};

    const posts = await Post.find(query)
      .populate("author", "name email") // show author name & email
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Post.countDocuments(query);

    res.json({
      posts,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get Single Post
export const getPostById = async (req, res) => {
  try {
    // this will populate the author field with the user's name and email instead of the just the user id stored in the post document
    const post = await Post.findById(req.params.id).populate(
      "author",
      "name email",
    );
    if (!post) return res.status(404).json({ message: "Post not found" });

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update Post (only author can update)
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Only author can update
    if (post.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You can only edit your own posts" });
    }

    const { title, content, category } = req.body;
    if (req.file) {
      post.image = `/uploads/${req.file.filename}`;
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.category = category || post.category;

    await post.save();
    res.json({ message: "Post updated successfully", post });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete Post (only author can delete)
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You can only delete your own posts" });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

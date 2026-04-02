import Post from "../models/Posts.js";

// Create Post (with optional image)
export const createPost = async (req, res, next) => {
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
      success: true,
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    next(error);
  }
};

// Get All Posts (with pagination & category filter)
export const getPosts = async (req, res, next) => {
  try {
    // this is for pagination and category filter to the query parameters
    const { page = 1, limit = 10, category } = req.query;

    const query = category ? { category } : {};

    const posts = await Post.find(query)
      .populate("author", "name email") // show author name & email
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Post.countDocuments(query);

    res.json({
      success: true,
      posts,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    next(error);
  }
};

// Get Single Post
export const getPostById = async (req, res, next) => {
  try {
    // this will populate the author field with the user's name and email instead of the just the user id stored in the post document
    const post = await Post.findById(req.params.id).populate(
      "author",
      "name email",
    );
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    res.json({ success: true, post });
  } catch (error) {
    next(error);
  }
};

// Update Post (only author can update)
export const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    // Only author can update
    const isAuthor = post.author.toString() === req.user._id.toString(); // this will return the boolian value
    const isAdmin = req.user.role === "admin";

    if (!isAuthor && !isAdmin) {
      return res
        .status(403)
        .json({ success: false, message: "You can only edit your own posts" });
    }

    const { title, content, category } = req.body;
    if (req.file) {
      post.image = `/uploads/${req.file.filename}`;
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.category = category || post.category;
    // this is for saving the info in the database
    await post.save();
    res.json({ success: true, message: "Post updated successfully", post });
  } catch (error) {
    next(error);
  }
};

// Delete Post (only author can delete)
export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    // this is so that only auther or the admin can delete the post
    const isAuthor = post.author.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isAuthor && !isAdmin) {
      return res
        .status(403)
        .json({ success: false, message: "You can only delete your own posts" });
    }

    await post.deleteOne();
    res.json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
};

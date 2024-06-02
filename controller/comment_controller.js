import { Comment } from "../models/comment_model.js";
import { User } from "../models/user_model.js";
import { Blog } from "../models/blog_model.js";

const add_comment = async (req, res) => {
  try {
    const { blog_id, user_id, content } = req.body;

    const blog = await Blog.findById(blog_id);
    const user = await User.findById(user_id);

    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new comment
    const newComment = new Comment({
      content,
      author: user_id,
      blog: blog_id,
    });

    await newComment.save();

    // Add the comment to the blog's comments array
    blog.comments.push(newComment._id);
    await blog.save();

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export { add_comment };

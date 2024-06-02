import {Blog} from "../models/blog_model.js"
const add_blog = async (req, res) => {
    try {
        const { title, content, image, author, authorName } = req.body;
        console.log(title, content, image, author, authorName );
        const newBlog = new Blog({ title, content, image, author, authorName });
        await newBlog.save();
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Edit an existing blog
const edit_blog = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, image, authorName } = req.body;
        const updatedBlog = await Blog.findByIdAndUpdate(id, { title, content, image, authorName }, { new: true });
        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all blogs
const get_all_blogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'username') .populate({
            path: 'comments',
            select: 'content createdAt'
        });
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a blog by ID
const get_blog_by_id = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id).populate('author', 'username')
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a blog
const delete_blog = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBlog = await Blog.findByIdAndDelete(id);
        if (!deletedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export {add_blog,edit_blog,get_all_blogs,get_blog_by_id,delete_blog};
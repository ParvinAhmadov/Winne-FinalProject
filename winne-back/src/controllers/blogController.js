const Blog = require("../models/Blog");

exports.createBlog = async (req, res) => {
  console.log(req.body);
  console.log(req.file);

  try {
    const { title, content, author, tags } = req.body;

    const newBlog = new Blog({
      title,
      content,
      author,
      tags: tags.split(","),
      image: req.file ? `/uploads/${req.file.filename}` : undefined,
    });

    await newBlog.save();

    res
      .status(201)
      .json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    const blogsWithFullImagePath = blogs.map((blog) => ({
      ...blog._doc,
      image: blog.image
        ? `${req.protocol}://${req.get("host")}${blog.image}`
        : null,
    }));
    res.json({ blogs: blogsWithFullImagePath });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    blog.image = blog.image
      ? `${req.protocol}://${req.get("host")}${blog.image}`
      : null;
    res.json({ blog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { title, content, author, tags } = req.body;

    const updatedBlog = await Blog.findOneAndUpdate(
      { slug: req.params.slug },
      {
        title,
        content,
        author,
        tags: tags.split(",").map((tag) => tag.trim()),
        image: req.file ? `/uploads/${req.file.filename}` : undefined,
      },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json({ message: "Blog updated successfully", blog: updatedBlog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog deleted successfully", blog });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Server error" });
  }
};

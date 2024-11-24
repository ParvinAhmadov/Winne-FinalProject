const mongoose = require("mongoose");
const slugify = require("slugify");

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  content: { type: String, required: true },
  author: { type: String, required: true, default: "Anonymous" },
  tags: [String],
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
});

BlogSchema.pre("save", function (next) {
  if (this.title && !this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model("Blog", BlogSchema);

const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const upload = require("../middleware/upload");

router.post("/", upload.single("image"), blogController.createBlog);
router.get("/", blogController.getAllBlogs);
router.get("/:slug", blogController.getBlogBySlug);
router.put("/:slug", upload.single("image"), blogController.updateBlog);
router.delete("/:id", blogController.deleteBlog);

module.exports = router;

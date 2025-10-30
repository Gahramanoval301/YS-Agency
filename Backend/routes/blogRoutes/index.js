const express = require("express");
const router = express.Router();
const {
  createCategory,
  deleteCategory,
  updateCategory,
  getCategoryById,
  getAllCategories,
  getAllBlogs,
  getSingleBlog,
  createBlog,
  deleteBlog,
  getLastThreeBlogs,
  updateBlog,
} = require("../../controllers/blogController");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", getAllBlogs);
router.get("/last-blogs", getLastThreeBlogs);
router.get("/category", getAllCategories);
router.post("/category", createCategory);
router.post("/", upload.single("file"), createBlog);
router.put("/:id", upload.single("file"), updateBlog);
router.get("/:idOrSlug", getSingleBlog);
router.delete("/:id", deleteBlog);
router.get("/category/:id", getCategoryById);
router.delete("/category/:id", deleteCategory);
router.put("/category/:id", updateCategory);
module.exports = router;

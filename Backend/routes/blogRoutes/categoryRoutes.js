const express = require("express");
const router = express.Router();
const {
  createCategory,
  deleteCategory,
  updateCategory,
  getCategoryById,
  getAllCategories,
} = require("../../controllers/blogController");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", getAllCategories);
router.post("/", createCategory);
router.get("/:id", getCategoryById);
router.delete("/:id", deleteCategory);
router.put("/:id", updateCategory);
module.exports = router;

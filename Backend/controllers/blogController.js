const { default: slugify } = require("slugify");
const { uploadImage, deleteImage } = require("../config/imagekit");
const { Blog, Tag, Category } = require("../models");
const { Op } = require("sequelize");

const createBlog = async (req, res) => {
  try {
    const {
      blogTitle,
      blogContent,
      //   blogImgUrl,
      //   blogImgUrlFileId,
      //   blogCategories = [],
      //   blogTags = [],
    } = req.body;

    let uploadedImage;

    if (req.file) {
      uploadedImage = await uploadImage(req.file);
    } else {
      return res.json({ status: 400, message: "Image is not attached!" });
    }

    if (!blogTitle || !blogContent) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    // 1️⃣ Create Blog
    const blog = await Blog.create({
      blogTitle,
      blogContent,
      blogImgUrl: uploadedImage.url,
      blogImgUrlFileId: uploadedImage.fileId,
      slug: slugify(blogTitle, { lower: true, strict: true }),
    });

    let blogCategories = [];
    let blogTags = [];

    if (req.body.blogCategories) {
      try {
        blogCategories = JSON.parse(req.body.blogCategories);
      } catch {
        return res
          .status(400)
          .json({ message: "blogCategories must be valid JSON array" });
      }
    }

    if (req.body.blogTags) {
      try {
        blogTags = JSON.parse(req.body.blogTags);
      } catch {
        return res
          .status(400)
          .json({ message: "blogTags must be valid JSON array" });
      }
    }

    // 2️⃣ Connect categories (many-to-many)
    if (blogCategories.length > 0) {
      const categories = await Category.findAll({
        where: { id: blogCategories },
      });
      await blog.setCategories(categories);
    }

    // 3️⃣ Handle tags (many-to-many, create if not exists)
    if (blogTags.length > 0) {
      const tagPromises = blogTags.map(async (title) => {
        let tag = await Tag.findOne({ where: { title } });
        if (!tag) tag = await Tag.create({ title });
        return tag;
      });
      const tags = await Promise.all(tagPromises);
      await blog.setTags(tags);
    }

    // 4️⃣ Return created blog with relations
    const createdBlog = await Blog.findByPk(blog.id, {
      include: [
        { model: Category, through: { attributes: [] } },
        { model: Tag, through: { attributes: [] } },
      ],
    });

    res.status(201).json(createdBlog);
  } catch (error) {
    console.error("Error creating blog:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// -------------------------
// Get all blogs (with pagination)
// -------------------------
const getAllBlogs = async (req, res) => {
  try {
    let { page = 1, limit = 10, category, tag, title } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const offset = (page - 1) * limit;

    const whereClause = {};
    if (title) {
      whereClause.blogTitle = { [Op.like]: `%${title}%` };
    }

    // 1️⃣ Fetch blog IDs that match category filter
    if (category) {
      const blogsWithCategory = await Blog.findAll({
        include: [
          {
            model: Category,
            attributes: [],
            where: { id: category },
            through: { attributes: [] },
          },
        ],
        attributes: ["id"],
      });
      const blogIds = blogsWithCategory.map((b) => b.id);
      whereClause.id = { [Op.in]: blogIds };
    }

    // 2️⃣ Fetch blog IDs that match tag filter
    if (tag) {
      const blogsWithTag = await Blog.findAll({
        include: [
          {
            model: Tag,
            attributes: [],
            where: { id: tag },
            through: { attributes: [] },
          },
        ],
        attributes: ["id"],
      });
      const blogIdsWithTag = blogsWithTag.map((b) => b.id);
      whereClause.id = whereClause.id
        ? {
            [Op.in]: blogIdsWithTag.filter((id) =>
              whereClause.id[Op.in].includes(id)
            ),
          } // intersection
        : { [Op.in]: blogIdsWithTag };
    }

    // 3️⃣ Fetch blogs with all categories/tags intact
    const { count, rows } = await Blog.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Category,
          attributes: ["id", "title"],
          through: { attributes: [] },
        },
        {
          model: Tag,
          attributes: ["id", "title"],
          through: { attributes: [] },
        },
      ],
      distinct: true,
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    res.json({
      total: count,
      page,
      pages: Math.ceil(count / limit),
      data: rows,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// -------------------------
// Get single blog by ID or slug
// -------------------------
const getSingleBlog = async (req, res) => {
  try {
    const { idOrSlug } = req.params;

    const blog = await Blog.findOne({
      where: {
        [Op.or]: [{ id: idOrSlug }, { slug: idOrSlug }],
      },
      include: [
        { model: Category, through: { attributes: [] } },
        { model: Tag, through: { attributes: [] } },
      ],
    });

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.json(blog);
  } catch (error) {
    console.error("Error fetching single blog:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getLastThreeBlogs = async (req, res) => {
  console.log("hello");

  try {
    const blogs = await Blog.findAll({
      include: [
        { model: Category, through: { attributes: [] } },
        { model: Tag, through: { attributes: [] } },
      ],
      order: [["createdAt", "DESC"]], // latest blogs first
      limit: 3, // only last 3 blogs
    });

    console.log(blogs);

    res.json(blogs);
  } catch (error) {
    console.error("Error fetching last 3 blogs:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      blogTitle,
      blogContent,
      //   blogCategories = [],
      //   blogTags = [],
    } = req.body;

    let blogCategories = [];
    let blogTags = [];

    if (req.body.blogCategories) {
      try {
        blogCategories = JSON.parse(req.body.blogCategories);
      } catch {
        return res
          .status(400)
          .json({ message: "blogCategories must be valid JSON array" });
      }
    }

    if (req.body.blogTags) {
      try {
        blogTags = JSON.parse(req.body.blogTags);
      } catch {
        return res
          .status(400)
          .json({ message: "blogTags must be valid JSON array" });
      }
    }

    // Find the blog
    const blog = await Blog.findByPk(id, {
      include: [{ model: Tag }, { model: Category }],
    });
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // 1️⃣ Handle image update
    if (req.file) {
      if (blog.blogImgUrlFileId) {
        try {
          await deleteImage(blog.blogImgUrlFileId);
        } catch (err) {
          console.warn("Failed to delete old image:", err.message);
        }
      }
      const uploadedImage = await uploadImage(req.file);
      blog.blogImgUrl = uploadedImage.url;
      blog.blogImgUrlFileId = uploadedImage.fileId;
    }

    // 2️⃣ Update title/content and slug
    if (blogTitle) {
      blog.blogTitle = blogTitle;
      blog.slug = slugify(blogTitle, { lower: true, strict: true });
    }
    if (blogContent) blog.blogContent = blogContent;

    await blog.save();

    // 3️⃣ Update categories
    if (blogCategories.length > 0) {
      const categories = await Category.findAll({
        where: { id: blogCategories },
      });
      await blog.setCategories(categories);
    }

    // 4️⃣ Update tags by title
    if (blogTags.length > 0) {
      const oldTags = blog.Tags;

      const tagPromises = blogTags.map(async (title) => {
        let tag = await Tag.findOne({ where: { title } });
        if (!tag) tag = await Tag.create({ title });
        return tag;
      });

      const newTags = await Promise.all(tagPromises);
      await blog.setTags(newTags);

      // Remove old tags not used in any other blog
      for (const tag of oldTags) {
        const count = await tag.countBlogs();
        if (count === 0) await tag.destroy();
      }
    }

    // 5️⃣ Return updated blog with relations
    const updatedBlog = await Blog.findByPk(blog.id, {
      include: [
        { model: Category, through: { attributes: [] } },
        { model: Tag, through: { attributes: [] } },
      ],
    });

    res.json(updatedBlog);
  } catch (error) {
    console.error("Error updating blog:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    // Find blog
    const blog = await Blog.findByPk(id, { include: [{ model: Tag }] });
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // Keep tags before deleting blog
    const blogTags = blog.Tags;

    // Delete image from ImageKit if exists
    if (blog.blogImgUrlFileId) {
      try {
        await deleteImage(blog.blogImgUrlFileId);
      } catch (err) {
        console.warn("Failed to delete image from ImageKit:", err.message);
      }
    }

    // Delete the blog
    await blog.destroy();

    // Check tags: delete if not used in any other blog
    for (const tag of blogTags) {
      const count = await tag.countBlogs();
      if (count === 0) {
        await tag.destroy();
      }
    }

    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// 📌 Create Category
const createCategory = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const existing = await Category.findOne({ where: { title } });
    if (existing) {
      return res.status(409).json({ message: "Category already exists" });
    }

    const newCategory = await Category.create({ title });
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 📌 Get all Categories (with optional pagination)
const getAllCategories = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const categories = await Category.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["createdAt", "DESC"]],
    });

    res.json({
      total: categories.count,
      page: parseInt(page),
      pages: Math.ceil(categories.count / limit),
      data: categories.rows,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 📌 Get Single Category by ID
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id, {
      include: [{ model: Blog, through: { attributes: [] } }],
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(category);
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 📌 Update Category
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const category = await Category.findByPk(id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    category.title = title || category.title;
    await category.save();

    res.json(category);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 📌 Delete Category
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    await category.destroy();
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllBlogs,
  getSingleBlog,
  getLastThreeBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  createCategory,
  deleteCategory,
  updateCategory,
  getCategoryById,
  getAllCategories,
};

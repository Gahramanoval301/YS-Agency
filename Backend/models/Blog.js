// src/models/Blog.js
const slugify = require("slugify");

module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define("Blog", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    blogTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    blogContent: {
      type: DataTypes.TEXT, // can hold HTML
      allowNull: false,
    },
    blogImgUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    blogImgUrlFileId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  // 🔗 Associations
  Blog.associate = (models) => {
    Blog.belongsToMany(models.Category, {
      through: "BlogCategories",
      foreignKey: "blogId",
      otherKey: "categoryId",
      // as: "categories", // unique alias for blog side
    });

    Blog.belongsToMany(models.Tag, {
      through: "BlogTags",
      foreignKey: "blogId",
      // as: "tags",
    });
  };

  // 🪄 Auto-generate slug
  Blog.beforeCreate((blog) => {
    blog.slug = slugify(blog.blogTitle, { lower: true, strict: true });
  });

  Blog.beforeUpdate((blog) => {
    blog.slug = slugify(blog.blogTitle, { lower: true, strict: true });
  });

  return Blog;
};

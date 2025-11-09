// src/models/Category.js
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  Category.associate = (models) => {
    // Many-to-many with Blog
    Category.belongsToMany(models.Blog, {
      through: "BlogCategories",
      foreignKey: "categoryId",
      otherKey: "blogId",
      // as: "blogs", // unique alias
    });

    // Many-to-many with Project
    Category.belongsToMany(models.Project, {
      through: "ProjectCategories",
      foreignKey: "categoryId",
      otherKey: "projectId",
      as: "projects", // unique alias (cannot match 'categories' or 'blogs')
    });
  };

  return Category;
};

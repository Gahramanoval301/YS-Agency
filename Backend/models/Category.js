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
    Category.belongsToMany(models.Blog, {
      through: "BlogCategories",
      foreignKey: "categoryId",
      otherKey: "blogId",
    });
  };

  return Category;
};

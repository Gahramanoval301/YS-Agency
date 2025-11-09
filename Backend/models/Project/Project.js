// src/models/Project.js
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define("Project", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    headline: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imgFileId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    sectionImages: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [
        { imgUrl: "", imgFileId: "" },
        { imgUrl: "", imgFileId: "" },
      ],
    },
  });

  Project.associate = (models) => {
    // Many-to-many with Category
    Project.belongsToMany(models.Category, {
      through: "ProjectCategories",
      foreignKey: "projectId",
      otherKey: "categoryId",
      as: "categories", // unique alias
    });

    // One-to-many sections
    Project.hasMany(models.PhotoDescSection, {
      foreignKey: "projectId",
      as: "photoDescSections",
    });
    Project.hasMany(models.VideoDescSection, {
      foreignKey: "projectId",
      as: "videoDescSections",
    });
    Project.hasMany(models.PhotoGallerySection, {
      foreignKey: "projectId",
      as: "photoGallerySections",
    });
    Project.hasMany(models.VideoGallerySection, {
      foreignKey: "projectId",
      as: "videoGallerySections",
    });
  };

  return Project;
};

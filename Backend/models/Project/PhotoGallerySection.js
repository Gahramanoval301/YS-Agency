// src/models/Project/PhotoGallerySection.js
module.exports = (sequelize, DataTypes) => {
  const PhotoGallerySection = sequelize.define("PhotoGallerySection", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: true, // Image URL
    },
    imgFileId: {
      type: DataTypes.STRING,
      allowNull: true, // ImageKit file ID for safe deletion
    },
  });

  PhotoGallerySection.associate = (models) => {
    PhotoGallerySection.belongsTo(models.Project, {
      foreignKey: "projectId",
      as: "project",
      onDelete: "CASCADE", // ensures section deleted when project deleted
    });
  };

  return PhotoGallerySection;
};

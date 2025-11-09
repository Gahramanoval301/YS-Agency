// src/models/Project/VideoGallerySection.js
module.exports = (sequelize, DataTypes) => {
  const VideoGallerySection = sequelize.define("VideoGallerySection", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    youtubeLink: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imgFileId: {
      type: DataTypes.STRING,
      allowNull: true, // ImageKit file ID for deletion/replacement
    },
  });

  VideoGallerySection.associate = (models) => {
    VideoGallerySection.belongsTo(models.Project, {
      foreignKey: "projectId",
      as: "project",
      onDelete: "CASCADE",
    });
  };

  return VideoGallerySection;
};

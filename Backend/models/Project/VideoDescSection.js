// src/models/Project/VideoDescSection.js
module.exports = (sequelize, DataTypes) => {
  const VideoDescSection = sequelize.define("VideoDescSection", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    youtubeLink: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imgFileId: {
      type: DataTypes.STRING,
      allowNull: true, // ImageKit file ID for safe deletion/replacement
    },
  });

  VideoDescSection.associate = (models) => {
    VideoDescSection.belongsTo(models.Project, {
      foreignKey: "projectId",
      as: "project",
      onDelete: "CASCADE",
    });
  };

  return VideoDescSection;
};

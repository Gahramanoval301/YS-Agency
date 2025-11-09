// src/models/Project/PhotoDescSection.js
module.exports = (sequelize, DataTypes) => {
  const PhotoDescSection = sequelize.define("PhotoDescSection", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
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
      allowNull: true, // for easy deletion/replacement in ImageKit
    },
  });

  PhotoDescSection.associate = (models) => {
    PhotoDescSection.belongsTo(models.Project, {
      foreignKey: "projectId",
      as: "project",
      onDelete: "CASCADE", // optional, ensures cleanup when project is deleted
    });
  };

  return PhotoDescSection;
};

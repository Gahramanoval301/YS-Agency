module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define("Tag", {
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

  Tag.associate = (models) => {
    Tag.belongsToMany(models.Blog, {
      through: "BlogTags",
      foreignKey: "tagId",
    });
  };

  return Tag;
};

module.exports = (sequelize, DataTypes) => {
  const Studio = sequelize.define(
    "Studio",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      headline: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      content: {
        type: DataTypes.TEXT("long"), // store long HTML content
        allowNull: true,
      },

      images: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: [
          { imgUrl: "", imgFileId: "" },
          { imgUrl: "", imgFileId: "" },
          { imgUrl: "", imgFileId: "" },
          { imgUrl: "", imgFileId: "" },
          { imgUrl: "", imgFileId: "" },
        ],
        // Each element represents one image slot in your frontend layout
      },
    },
    {
      timestamps: true,
    }
  );

  return Studio;
};

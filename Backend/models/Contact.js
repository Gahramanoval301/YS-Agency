module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define(
    "Contact",
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

      subHeadline: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      cardsData: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: [
          { type: "address", value: "" },
          { type: "email", value: "@ysagency.az" },
          { type: "tel", value: "+994" },
          { type: "map", value: "" },
        ],
      },

      socialMedias: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: [
          { type: "Ins", value: "" },
          { type: "Ln", value: "" },
          { type: "tiktok", value: "" },
          { type: "Yt", value: "" },
        ],
      },
    },
    {
      timestamps: true,
    }
  );

  return Contact;
};

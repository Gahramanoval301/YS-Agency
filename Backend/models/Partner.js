module.exports = (sequelize, DataTypes) => {
  const Partner = sequelize.define(
    "Partner",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imgUrlFileId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      note: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: true,
    }
  );

  return Partner;
};

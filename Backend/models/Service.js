module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define(
    "Service",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      includes: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: [],
      },
    },
    {
      tableName: "services",
      timestamps: true,
    }
  );

  // 🔗 (Optional) Associations
  Service.associate = (models) => {
    // If you want to link later, for example:
    // Service.hasMany(models.Blog, { foreignKey: "serviceId" });
  };

  return Service;
};

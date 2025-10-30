// models/user.js
module.exports = (sequelize, DataTypes) => {
  const AdminUser = sequelize.define(
    "AdminUser",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userEmail: {
        type: DataTypes.STRING,
        unique: true,
        validate: { isEmail: true },
      },
      verificationCode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      verificationExpires: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      password: DataTypes.STRING,
      refreshToken: { type: DataTypes.STRING },
    },
    {
      timestamps: true,
    }
  );

  return AdminUser;
};

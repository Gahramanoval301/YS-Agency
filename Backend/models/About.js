// models/user.js
module.exports = (sequelize, DataTypes) => {
  const About = sequelize.define(
    "About",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      imageUrl: {
        type: DataTypes.STRING,
      },
      imageUrlFileId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      statistics: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: {
          projects: "+200",
          annualSuccessActivity: "+4",
          partnership: "+150",
          ourTeam: "+9",
        },
      },
      texts: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: [
          {
            headline: "Gəncik, mobil və sosialıq!",
            content: "<p>Biz mobil və sosial həllər təqdim edirik.</p>",
          },
          {
            headline: "Sizin uğurunuz bizim hədəfimizdir!",
            content: "<h1>Professional xidmət Yüksək keyfiyyət</h1>",
          },
        ],
      },
    },
    {
      timestamps: true,
    }
  );

  return About;
};

// src/models/index.js
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const db = {};

// Import models
db.User = require("./User")(sequelize, DataTypes);
db.AdminUser = require("./AdminUser")(sequelize, DataTypes);
db.About = require("./About")(sequelize, DataTypes);
db.Category = require("./Category")(sequelize, DataTypes);
db.Tag = require("./Tag")(sequelize, DataTypes);
db.Blog = require("./Blog")(sequelize, DataTypes);
db.Partner = require("./Partner")(sequelize, DataTypes);
db.Service = require("./Service")(sequelize, DataTypes);
db.Contact = require("./Contact")(sequelize, DataTypes);
db.ClientMessage = require("./ClientMessage")(sequelize, DataTypes);
db.Studio = require("./Studio")(sequelize, DataTypes);

// Project models
db.Project = require("./Project/Project")(sequelize, DataTypes);
db.PhotoDescSection = require("./Project/PhotoDescSection")(
  sequelize,
  DataTypes
);
db.VideoDescSection = require("./Project/VideoDescSection")(
  sequelize,
  DataTypes
);
db.PhotoGallerySection = require("./Project/PhotoGallerySection")(
  sequelize,
  DataTypes
);
db.VideoGallerySection = require("./Project/VideoGallerySection")(
  sequelize,
  DataTypes
);

// ✅ Register associations
if (db.Blog.associate) db.Blog.associate(db);
if (db.Category.associate) db.Category.associate(db);
if (db.Tag.associate) db.Tag.associate(db);

// These also have `belongsTo(Project)` so they must be called too:
if (db.Project.associate) db.Project.associate(db);
if (db.PhotoDescSection.associate) db.PhotoDescSection.associate(db);
if (db.VideoDescSection.associate) db.VideoDescSection.associate(db);
if (db.PhotoGallerySection.associate) db.PhotoGallerySection.associate(db);
if (db.VideoGallerySection.associate) db.VideoGallerySection.associate(db);

// Export sequelize instance
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

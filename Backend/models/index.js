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

// Run associations
if (db.Blog.associate) db.Blog.associate(db);
if (db.Category.associate) db.Category.associate(db);
if (db.Tag.associate) db.Tag.associate(db);

// Export sequelize instance
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

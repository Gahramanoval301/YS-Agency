// models/index.js
const Sequelize = require('sequelize');
const sequelize = require('../config/database');


const db = {};


// import models
db.User = require('./user')(sequelize, Sequelize.DataTypes);


// If you have associations, define here
// e.g. db.User.hasMany(db.Post);


db.sequelize = sequelize;


module.exports = db;
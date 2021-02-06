const Sequelize = require('sequelize');

// Creates connection to mysql db using sequelize
module.exports = new Sequelize('QandA', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});
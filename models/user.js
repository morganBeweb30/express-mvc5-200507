const Sequelize = require('sequelize');
const db = require('../helpers/db-helper');

const User = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allawNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING
});


module.exports = User;


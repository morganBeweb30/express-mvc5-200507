const Sequelize = require('sequelize');
const db = require('../helpers/db-helper');

const Order = db.define('order', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allawNull: false,
    primaryKey: true
  }
});


module.exports = Order;


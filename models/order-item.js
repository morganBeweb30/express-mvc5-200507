const Sequelize = require('sequelize');
const db = require('../helpers/db-helper');

const OrderItem = db.define('orderItem', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allawNull: false,
    primaryKey: true
  },
  quantity: Sequelize.INTEGER
});


module.exports = OrderItem;


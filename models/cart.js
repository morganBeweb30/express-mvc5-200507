const Sequelize = require('sequelize');
const db = require('../helpers/db-helper');

const Cart = db.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allawNull: false,
    primaryKey: true
  }
});


module.exports = Cart;


const Sequelize = require('sequelize');
const db = require('../helpers/db-helper');

const CartItem = db.define('cartItem', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allawNull: false,
    primaryKey: true
  },
  quantity: Sequelize.INTEGER   //  shortcut : si 1 seule donnée, pas besoin de mettre les {}
});


module.exports = CartItem;


const Sequelize = require('sequelize');
const db = require('../helpers/db-helper');

const Book = db.define('book', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    descr: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

module.exports = Book;


const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  'library_gestion',
  'morgan',
  'Nimport5quoi',
  {
    dialect: 'mysql',   //  | pas obligé
    host: 'localhost'   //  | pas obligé
  }
);

module.exports = sequelize;

/*
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'morgan',
  password: 'Nimport5quoi',
  database: 'library_gestion'
});

module.exports = pool.promise();
*/

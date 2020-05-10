const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'morgan',
  password: 'Nimport5quoi',
  database: 'library_gestion'
});

module.exports = pool.promise();


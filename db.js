// db.js
const mysql = require('mysql2/promise');

// Create a connection pool (recommended)
const pool = mysql.createPool({
  host: 'localhost',      // your MySQL host
  user: 'your_mysql_user',   // your MySQL username
  password: 'your_mysql_password', // your MySQL password
  database: 'esteron_db',       // your database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;

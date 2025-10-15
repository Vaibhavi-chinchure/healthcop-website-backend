const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: '192.168.1.6',
  user: 'vaibhavi',
  password: '@Vaibhavi143',
  database: 'healthcop',
});

pool.getConnection()
  .then(connection => {
    console.log("Database connected successfully");
    connection.release();
  })
  .catch(err => {
    console.error("Database connection failed:", err.message);
  });

module.exports = pool;
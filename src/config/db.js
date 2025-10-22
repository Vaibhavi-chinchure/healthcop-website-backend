const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: 'gateway01.ap-northeast-1.prod.aws.tidbcloud.com',
  user: '3io6ZMytZpS2mdq.root',
  password: 'HDSNA0OluDsCXNWV',
  database: 'healthcop',
   ssl: {
    rejectUnauthorized: true
  }
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

import mysql from "mysql2/promise";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const pool = mysql.createPool({
  host: '192.168.1.6',
  user: 'vaibhavi',
  password: '@Vaibhavi143',
  database: 'healthcop',
  ssl: {
    rejectUnauthorized: false,
    ca: fs.readFileSync(process.env.CA),
    servername: undefined
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

export default pool;

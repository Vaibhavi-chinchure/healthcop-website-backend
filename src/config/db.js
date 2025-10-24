import mysql from "mysql2/promise";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const pool = mysql.createPool({
  host: 'gateway01.ap-northeast-1.prod.aws.tidbcloud.com',
  user: '3io6ZMytZpS2mdq.root',
  password: 'HDSNA0OluDsCXNWV',
  database: 'healthcop',
  ssl: process.env.CA
    ? {
        rejectUnauthorized: false,
        ca: fs.readFileSync(process.env.CA),
        servername: undefined,
      }
    : { rejectUnauthorized: false },
});

pool.getConnection()
  .then(connection => {
    console.log("✅ Database connected successfully");
    connection.release();
  })
  .catch(err => {
    console.error("❌ Database connection failed:", err.message);
  });

export default pool;

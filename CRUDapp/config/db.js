const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

// Create a connection pool for managing multiple connections
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection error:", err.message);
  } else {
    console.log("Connected to MySQL Database");
    connection.release(); // release connection back to pool
  }
});

module.exports = db.promise(); // Exporting a Promise-based connection

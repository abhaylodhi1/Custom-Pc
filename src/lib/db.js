// lib/db.js
import mysql from 'mysql2/promise';

export async function connectDB() {
  return mysql.createConnection({
    host: 'localhost',
    port: 3307, // Default MySQL port
    user: 'root',
    password: '', // default XAMPP password
    database: 'pc_gaming_db',
  });
}

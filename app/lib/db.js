import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: 'root',
  password: '9E0s9{A-[Q.r|]AY.',
  database: 'firststepLandingPage', // Database selection here
  port: '3307',
});

export default pool;

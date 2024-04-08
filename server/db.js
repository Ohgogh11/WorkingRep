const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()
// const pool = mysql.createPool({
//     host: '127.0.0.1',
//     user: 'root',
//     password: 'Ohgogh5512',
//     database: 'alphaman'
// }).promise()

module.exports = pool;
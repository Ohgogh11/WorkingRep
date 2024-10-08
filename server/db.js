const mysql = require("mysql2");

/**
 * Creates a MySQL connection pool using the provided environment variables for host, user, password, and database.
 */

console.log("pool created");
const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();
// const pool = mysql.createPool({
//     host: '127.0.0.1',
//     user: 'root',
//     password: 'Ohgogh5512',
//     database: 'alphaman'
// }).promise()

module.exports = pool;

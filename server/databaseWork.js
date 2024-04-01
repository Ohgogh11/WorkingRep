const mysql = require('mysql2');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

async function getUserByEmail(email) {
    try {
        const [rows] = await pool.query('SELECT * FROM Users WHERE email = ?', [email]);
        return rows[0]; // Return the user object or null if not found
    } catch (err) {
        console.error(err);
        throw err; // Re-throw the error for handling in the route
    }
}

async function comparePasswords(user, password) {

    bcrypt.genSalt
    try {
        const validPassword = await bcrypt.compare(password, user.user_password);
        console.log(validPassword);
        return validPassword;
    } catch (err) {
        console.error(err);
        throw err; // Re-throw the error for handling in the route
    }
}

module.exports = {
    getUserByEmail,
    comparePasswords,
};
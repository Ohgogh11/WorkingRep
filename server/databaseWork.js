const bcrypt = require('bcrypt');
const pool = require('./db');

// async function getUserByEmail(email) {
//     try {
//         const [rows] = await pool.query('SELECT * FROM Users WHERE email = ?', [email]);
//         return rows[0]; // Return the user object or null if not found
//     } catch (err) {
//         console.error(err);
//         throw err; // Re-throw the error for handling in the route
//     }
// }

function getUserByEmail(email) {
    return new Promise(async (resolve, reject) => {
        try {
            const [rows] = await pool.query('SELECT * FROM Users WHERE email = ?', [email]);
            resolve(rows.length > 0 ? rows[0] : null);
        } catch (error) {
            reject(error);
        }
    });
}

// async function comparePasswords(user, password) {
//     try {
//         const validPassword = await bcrypt.compare(password, user.user_password);
//         console.log(validPassword);
//         return validPassword;
//     } catch (err) {
//         console.error(err);
//         throw err; // Re-throw the error for handling in the route
//     }
// }

function comparePasswords(user, password) {
    return new Promise(async (resolve, reject) => {
        try {
            const validPassword = await bcrypt.compare(password, user.user_password);
            resolve(validPassword);
        } catch (error) {
            reject(error);
        }
    });
}

function doesUserExist(email, phoneNumber) {
    return new Promise(async (resolve, reject) => {
        try {
            const [rows] = await pool.query('SELECT COUNT(*) AS user_count FROM Users WHERE email = ? OR phone_number = ?', [email, phoneNumber]);
            resolve(rows[0].user_count > 0);
        } catch (error) {
            reject(error);
        }
    });
}

// Function to insert user (with password hashing)
async function insertUser(email, first_name, last_name, phone_number, password, permission = 'regular') {
    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash password with cost factor 10
        const [result] = await pool.query('INSERT INTO Users (email, phone_number, first_name, last_name, user_password, permission) VALUES (?, ?, ?, ?, ?, ?)', [email, phone_number, first_name, last_name, hashedPassword, permission]);
        return result.insertId;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getUserByEmail,
    comparePasswords,
    insertUser,
    doesUserExist,
};
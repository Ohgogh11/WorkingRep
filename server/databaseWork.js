const bcrypt = require("bcrypt");
const pool = require("./db");
const { deleteProductImage } = require("./UploadProductImage");
// async function getUserByEmail(email) {
//     try {
//         const [rows] = await pool.query('SELECT * FROM Users WHERE email = ?', [email]);
//         return rows[0]; // Return the user object or null if not found
//     } catch (err) {
//         console.error(err);
//         throw err; // Re-throw the error for handling in the route
//     }
// }
function insertToWishList(userId, productId) {
  return new Promise(async (resolve, reject) => {
    try {
      const [rows] = await pool.query(
        "INSERT INTO wishList (user_id,product_id) VALUES (?,?)",
        [userId, productId]
      );
      resolve(rows.affectedRows);
    } catch (error) {
      reject(error);
    }
  });
}
function deleteWishList(userId, productId) {
  return new Promise(async (resolve, reject) => {
    try {
      const [rows] = await pool.query(
        "DELETE FROM wishlist WHERE user_id = ? AND product_id = ?",
        [userId, productId]
      );
      resolve(rows.affectedRows);
    } catch (error) {
      reject(error);
    }
  });
}

function getUserByEmail(email) {
  return new Promise(async (resolve, reject) => {
    try {
      const [rows] = await pool.query("SELECT * FROM Users WHERE email = ?", [
        email,
      ]);
      resolve(rows.length > 0 ? rows[0] : null);
    } catch (error) {
      reject(error);
    }
  });
}

function getUserById(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const [rows] = await pool.query("SELECT * FROM Users WHERE user_id = ?", [
        id,
      ]);
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
      const [rows] = await pool.query(
        "SELECT COUNT(*) AS user_count FROM Users WHERE email = ? OR phone_number = ?",
        [email, phoneNumber]
      );
      resolve(rows[0].user_count > 0);
    } catch (error) {
      reject(error);
    }
  });
}

function doesProductExists(productId) {
  return new Promise(async (resolve, reject) => {
    try {
      const [rows] = await pool.query(
        "SELECT COUNT(*) AS product_count FROM products WHERE product_id = ? ",
        [productId]
      );
      resolve(rows[0].product_count > 0);
    } catch (error) {
      reject(error);
    }
  });
}

// Function to insert user (with password hashing)
async function insertUser(
  email,
  first_name,
  last_name,
  phone_number,
  password,
  permission = "regular"
) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password with cost factor 10
    const [result] = await pool.query(
      "INSERT INTO Users (email, phone_number, first_name, last_name, user_password, permission) VALUES (?, ?, ?, ?, ?, ?)",
      [email, phone_number, first_name, last_name, hashedPassword, permission]
    );
    return result.insertId;
  } catch (error) {
    throw error;
  }
}

function getProducts() {
  return new Promise(async (resolve, reject) => {
    try {
      const [rows] = await pool.query("SELECT * FROM products");
      resolve(rows.length > 0 ? rows[0] : null);
    } catch (error) {
      reject(error);
    }
  });
}

function insertProduct(
  product_name,
  product_description,
  price,
  stock_quantity,
  imageUrl
) {
  return new Promise(async (resolve, reject) => {
    try {
      const [rows] = await pool.query(
        "INSERT INTO products (product_name, product_description, price, stock_quantity, image_url) VALUES (?,?,?,?,?)",
        [
          product_name,
          product_description,
          parseFloat(price),
          parseInt(stock_quantity),
          imageUrl,
        ]
      );
      resolve(rows.affectedRows);
    } catch (error) {
      reject("error at insertProduct error: " + error.message);
    }
  });
}

async function deleteImageFromDB(productId) {
  try {
    const [imageUrlResult] = await pool.query(
      "SELECT image_url FROM products WHERE product_id = ?",
      [productId]
    );
    const imageUrl = imageUrlResult[0]?.image_url; // Accessing the first row's 'image_url' property

    // If you want to extract the filename from the URL
    const imageUrlParts = imageUrl.toString().split("/");
    const filename = imageUrlParts[imageUrlParts.length - 1];
    await deleteProductImage(filename);
  } catch (error) {
    console.log(error);
  }
}

async function deleteProductFromDB(productId) {
  console.log(await deleteImageFromDB(productId));

  return new Promise(async (resolve, reject) => {
    try {
      const [rows] = await pool.query(
        "DELETE FROM products WHERE product_id = ?",
        [productId]
      );
      resolve(rows.affectedRows);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  getUserByEmail,
  comparePasswords,
  insertUser,
  doesUserExist,
  getUserById,
  getProducts,
  insertProduct,
  deleteProductFromDB,
  insertToWishList,
  deleteWishList,
  doesProductExists,
};

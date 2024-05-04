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
function getBarberServices(barbersName) {
  return new Promise(async (resolve, reject) => {
    try {
      let barbers_id = await getBarberIdByFirstName(barbersName);
      const [rows] = await pool.query(
        "SELECT initial_cost,description,name FROM service_type WHERE barber_id = ?",
        [barbers_id]
      ); // get all
      resolve(rows);
    } catch (error) {
      reject(error);
    }
  });
}

function insertAppointment(userId, barbersName, date, time, appTypeName) {
  return new Promise(async (resolve, reject) => {
    try {
      let barber_id = await getBarberIdByFirstName(barbersName);
      let type_id = await getTypeIdByName(appTypeName);
      const [rows] = await pool.query(
        "INSERT INTO appointments (user_id, barber_id, date, time, status, type_id) VALUES (?,?,?,?,?,?)",
        [parseInt(userId), barber_id, date, time, "pending", type_id]
      );
      resolve(rows.affectedRows);
    } catch (error) {
      reject(error);
    }
  });
}

function getTypeIdByName(appTypeName) {
  return new Promise(async (resolve, reject) => {
    try {
      const [type_id] = await pool.query(
        "SELECT type_id FROM service_type WHERE name = ?",
        [appTypeName]
      );
      resolve(type_id[0].type_id);
    } catch (error) {
      reject(error);
    }
  });
}

function getAppointmentsByDate(date) {
  // date format is (YYYY-MM-DD)
  return new Promise(async (resolve, reject) => {
    try {
      const [Hours] = await pool.query(
        "SELECT time FROM appointments WHERE date = ?",
        [date]
      );
      resolve(
        Hours.map((item) => {
          // Split the time string by ':' and get the first two elements
          const [hours, minutes] = item.time.split(":");
          // Concatenate hours and minutes with a ':'
          return `${hours}:${minutes}`;
        })
      );
    } catch (error) {
      reject(error); // Re-throw the error)
    }
  });
}

function getBarbersWorkingHoursByDate(barberId, dayOfWeek) {
  return new Promise(async (resolve, reject) => {
    try {
      // Fetch barber's working hours
      const [workingHoursRows] = await pool.execute(
        "SELECT start_time, end_time, appointment_duration FROM barber_schedule WHERE barber_id = ? AND day_of_week = ? AND working = 1",
        [barberId, dayOfWeek]
      );

      if (!workingHoursRows[0]) {
        return resolve([]);
        // throw new Error("Barber not found or not working on the specified day");
      }

      const { start_time, end_time, appointment_duration } =
        workingHoursRows[0];

      // Fetch barber's breaks
      const [breaksRows] = await pool.execute(
        "SELECT start_time, end_time FROM barber_schedule_breaks WHERE barber_id = ? AND day_of_week = ?",
        [barberId, dayOfWeek]
      );

      // Convert time strings to Date objects for easier comparison
      const startDateTime = new Date(`1970-01-01T${start_time}`);
      const endDateTime = new Date(`1970-01-01T${end_time}`);
      const appointmentDurationMs = appointment_duration * 60000; // convert minutes to milliseconds

      // Generate available hours
      const availableHours = [];
      let currentDateTime = new Date(startDateTime);

      while (currentDateTime <= endDateTime) {
        const currentHour = currentDateTime.getHours();
        const currentMinute = currentDateTime.getMinutes();

        const isDuringBreak = breaksRows.some(
          ({ start_time: breakStart, end_time: breakEnd }) => {
            const breakStartTime = new Date(`1970-01-01T${breakStart}`);
            const breakEndTime = new Date(`1970-01-01T${breakEnd}`);
            return (
              currentDateTime >= breakStartTime &&
              currentDateTime < breakEndTime
            );
          }
        );

        if (!isDuringBreak) {
          availableHours.push(
            `${currentHour.toString().padStart(2, "0")}:${currentMinute
              .toString()
              .padStart(2, "0")}`
          );
        }

        currentDateTime.setTime(
          currentDateTime.getTime() + appointmentDurationMs
        );
      }

      resolve(availableHours);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

function getBarberIdByFirstName(firstName) {
  return new Promise(async (resolve, reject) => {
    try {
      const [rows] = await pool.execute(
        "SELECT barber_id FROM Barbers AS barbers INNER JOIN Users AS users ON barbers.user_id = users.user_id WHERE users.first_name = ?",
        [firstName]
      );
      resolve(rows.length > 0 ? rows[0].barber_id : null);
    } catch (error) {
      reject(error);
    }
  });
}

function canScheduleAppointment(userId) {
  return new Promise(async (resolve, reject) => {
    try {
      const [result] = await pool.execute(
        "SELECT COUNT(*) AS count FROM appointments WHERE user_id = ?",
        [parseInt(userId)]
      );
      resolve(result[0].count === 0 ? true : false); // Extract the existence value
    } catch (error) {
      reject(error);
    }
  });
}

function getBarbers() {
  return new Promise(async (resolve, reject) => {
    try {
      const [rows] = await pool.query(
        "SELECT first_name FROM Users WHERE permission = 'barber'"
      ); // get all
      resolve(rows);
    } catch (error) {
      reject(error);
    }
  });
}

function insertToWishList(userId, productId) {
  return new Promise(async (resolve, reject) => {
    try {
      const [rows] = await pool.query(
        "INSERT INTO wishList (user_id,product_id) VALUES (?,?)",
        [parseInt(userId), productId]
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
        [parseInt(userId), productId]
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
  getBarbers,
  canScheduleAppointment,
  getBarberIdByFirstName,
  getBarbersWorkingHoursByDate,
  getAppointmentsByDate,
  getTypeIdByName,
  insertAppointment,
  getBarberServices,
};

const bcrypt = require("bcrypt");
const pool = require("./db");
const { deleteProductImage } = require("./UploadProductImage");
/**
 * Update the status of an appointment.
 * @param {number} userId - The ID of the user that scheduled the appointment to update.
 * @param {string} newStatus - The new status value.
 * @returns {Promise<number>} A promise that resolves with the number of affected rows.
 * @throws {Error} If an error occurs during the database operation.
 */
function updateAppointmentStatus(userId, newStatus) {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = "UPDATE appointments SET status = ? WHERE user_id = ?";
      const [result] = await pool.query(sql, [newStatus, userId]);
      resolve(result.affectedRows > 0);
    } catch (error) {
      reject(error);
    }
  });
}
/**
 * Delete appointments by user ID.
 * @param {number} userId - The ID of the user whose appointments will be deleted.
 * @returns {Promise<number>} A promise that resolves with the number of affected rows.
 * @throws {Error} If an error occurs during the database operation.
 */
function deleteAppointmentByUserId(userId) {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = "DELETE FROM appointments WHERE user_id = ?";
      const [result] = await pool.query(sql, [userId]);
      resolve(result.affectedRows > 0);
    } catch (error) {
      reject(error);
    }
  });
}
/**
 * Retrieves the barber services offered by a specific barber.
 * @param {string} barbersName - The name of the barber whose services are being retrieved.
 * @returns {Promise} A promise that resolves with an array of objects containing the initial cost, description, and name of each service offered by the barber.
 * @throws {Error} If there is an error in retrieving the barber services.
 */
function getBarberServices(barbersName) {
  return new Promise(async (resolve, reject) => {
    try {
      let barbers_id = await getBarberIdByFirstName(barbersName);
      const [rows] = await pool.query(
        "SELECT initial_cost,description,name FROM service_type WHERE barber_id = ?",
        [barbers_id]
      ); // get all
      return resolve(rows);
    } catch (error) {
      return reject(error);
    }
  });
}
/**
 * Inserts a new appointment into the database with the provided details.
 * @param {number} userId - The ID of the user making the appointment.
 * @param {string} barbersName - The name of the barber for the appointment.
 * @param {Date} date - The date of the appointment.
 * @param {Date} time - The time of the appointment.
 * @param {string} appTypeName - The type of appointment.
 * @param {string} confirmationToken - confirmation token for the appointment for link creation
 * @returns {Promise<number>} A promise that resolves to the number of affected rows in the appointments table.
 */
function insertAppointment(
  userId,
  barbersName,
  date,
  time,
  appTypeName,
  confirmationToken
) {
  return new Promise(async (resolve, reject) => {
    try {
      let barber_id = await getBarberIdByFirstName(barbersName);
      let type_id = await getTypeIdByName(appTypeName);
      const [rows] = await pool.query(
        "INSERT INTO appointments (user_id, barber_id, date, time, status, type_id, confirmation_token) VALUES (?,?,?,?,?,?,?)",
        [
          parseInt(userId),
          barber_id,
          date,
          time,
          "pending",
          type_id,
          confirmationToken,
        ]
      );
      resolve(rows.affectedRows);
    } catch (error) {
      reject(error);
    }
  });
}
/**
 * Retrieves the type ID from the database based on the given application type name.
 * @param {string} appTypeName - The name of the application type to retrieve the ID for.
 * @returns {Promise<number>} A promise that resolves with the type ID if successful, or rejects with an error.
 */
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
/**
 * Retrieves appointments by date from the database.
 * @param {string} date - The date for which appointments are to be retrieved.
 * @returns {Promise<Array<string>>} A promise that resolves to an array of appointment times in HH:mm format.
 * @throws {Error} If there is an error while retrieving appointments.
 */
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
/**
 * Retrieves the confirmation token for a user's appointments from the database.
 * @param {number} userId - The ID of the user to retrieve the token for.
 * @returns {Promise<string>} A promise that resolves with the confirmation token if found,
 * or rejects with an error message if no appointment is found for the user.
 */
function getUserAppointmentsToken(userId) {
  return new Promise(async (resolve, reject) => {
    try {
      const [confirmationToken] = await pool.query(
        "SELECT confirmation_token FROM appointments WHERE user_id = ?",
        [userId]
      );
      if (confirmationToken) {
        resolve(confirmationToken[0]);
      }
      throw new Error("No appointment with user id ");
    } catch (error) {
      resolve(error); // Re-throw the error
    }
  });
}
/**
 * Retrieves appointment details for a specific user from the database.
 * @param {number} userId - The ID of the user whose appointment details are to be retrieved.
 * @returns {Promise} A promise that resolves with the appointment details of the user.
 */
function getAppointmentsByUserId(userId) {
  return new Promise(async (resolve, reject) => {
    // SQL query to retrieve appointment details along with user information
    const sql = `
      SELECT appointments.*, service_type.*,users.first_name
      FROM appointments
      JOIN users ON appointments.user_id = users.user_id
      JOIN service_type ON appointments.type_id = service_type.type_id
      WHERE appointments.user_id = ?
    `;

    try {
      const [appointment] = await pool.query(sql, [userId]);
      resolve(appointment);
    } catch (error) {
      reject(error);
    }
    // Execute the query
  });
}
/**
 * Get the day of the week for a given date string.
 * @param {string} dateString - The date string in a valid date format.
 * @returns {string} The day of the week corresponding to the given date string.
 */
function getDayOfWeek(dateString) {
  // Create a new Date object using the dateString
  const date = new Date(dateString);

  // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const dayOfWeekIndex = date.getDay();

  // Define an array of day names
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  // Return the name of the day of the week corresponding to the index
  return daysOfWeek[dayOfWeekIndex];
}
/**
 * Retrieves the working hours of a barber on a specific day of the week.
 * @param {number} barberId - The ID of the barber.
 * @param {Date} SelectedDate - The Date the user Selected
 * @returns {Promise} A promise that resolves to an array of available hours for appointments.
 */
function getBarbersWorkingHoursByDate(barberId, SelectedDate) {
  const dayOfWeek = getDayOfWeek(SelectedDate);
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
      const startDateTime = new Date(
        new Date(SelectedDate).setHours(...start_time.split(":").map(Number))
      );

      const endDateTime = new Date(
        new Date(SelectedDate).setHours(...end_time.split(":").map(Number))
      );
      const appointmentDurationMs = appointment_duration * 60000; // convert minutes to milliseconds

      const realDateTime = new Date(new Date().getTime() + 3 * 60 * 60 * 1000); // real current time + 3 hours

      // Generate available hours
      const availableHours = [];
      let currentDateTime = new Date(startDateTime);
      while (currentDateTime <= endDateTime) {
        const currentHour = currentDateTime.getHours();
        const currentMinute = currentDateTime.getMinutes();

        const isDuringBreak = breaksRows.some(
          ({ start_time: breakStart, end_time: breakEnd }) => {
            const breakStartTime = new Date(
              new Date().setHours(...breakStart.split(":").map(Number))
            );
            const breakEndTime = new Date(
              new Date().setHours(...breakEnd.split(":").map(Number))
            );
            return (
              currentDateTime >= breakStartTime &&
              currentDateTime < breakEndTime
            );
          }
        );
        // check if the current time isn't in the breaks range and if its 3 hours apart from the real  current time
        if (!isDuringBreak && currentDateTime > realDateTime) {
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
/**
 * Retrieves the barber ID based on the first name of the barber.
 * @param {string} firstName - The first name of the barber to search for.
 * @returns {Promise<number|null>} A promise that resolves with the barber ID if found, or null if not found.
 */
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
/**
 * Checks if a user can schedule an appointment based on the number of existing appointments.
 * @param {number} userId - The ID of the user to check for appointment scheduling.
 * @returns {Promise<boolean>} A promise that resolves to true if the user can schedule an appointment, false otherwise.
 */
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
/**
 * Retrieves a list of barbers from the database.
 * @returns {Promise<Array>} A promise that resolves with an array of objects containing the first names of barbers.
 * @throws {Error} If there is an error while querying the database.
 */
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
/**
 * Inserts a product into a user's wishlist in the database.
 * @param {number} userId - The ID of the user adding the product to their wishlist.
 * @param {number} productId - The ID of the product being added to the wishlist.
 * @returns {Promise<number>} A promise that resolves to the number of affected rows in the database.
 * @throws {Error} If there is an error inserting the product into the wishlist.
 */
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
/**
 * Deletes a product from a user's wishlist in the database.
 * @param {number} userId - The ID of the user whose wishlist is being modified.
 * @param {number} productId - The ID of the product to be deleted from the wishlist.
 * @returns {Promise<number>} A promise that resolves to the number of rows affected by the deletion.
 * @throws {Error} If there is an error deleting the product from the wishlist.
 */
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
/**
 * Retrieves a user from the database based on their email address.
 * @param {string} email - The email address of the user to retrieve.
 * @returns {Promise} A promise that resolves with the user object if found, or null if not found.
 * @throws {Error} If there is an error while querying the database.
 */
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
/**
 * Retrieves a user from the database based on the provided user ID.
 * @param {number} id - The ID of the user to retrieve.
 * @returns {Promise} A promise that resolves with the user object if found, or null if not found.
 * @throws {Error} If there is an error while querying the database.
 */
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
/**
 * Compare the provided password with the hashed password stored for a user.
 * @param {object} user - The user object containing the hashed password.
 * @param {string} password - The password to compare with the hashed password.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the passwords match.
 */
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
/**
 * Check if a user exists in the database based on their email or phone number.
 * @param {string} email - The email of the user to check.
 * @param {string} phoneNumber - The phone number of the user to check.
 * @returns {Promise<boolean>} A promise that resolves to true if the user exists, false otherwise.
 */
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
/**
 * Check if a product with the given productId exists in the database.
 * @param {number} productId - The id of the product to check for existence.
 * @returns {Promise<boolean>} A promise that resolves to true if the product exists, false otherwise.
 * @throws {Error} If there is an error while querying the database.
 */
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
/**
 * Inserts a new user into the database with the provided information.
 * @param {string} email - The email of the user.
 * @param {string} first_name - The first name of the user.
 * @param {string} last_name - The last name of the user.
 * @param {string} phone_number - The phone number of the user.
 * @param {string} password - The password of the user.
 * @param {string} [permission='regular'] - The permission level of the user (default is 'regular').
 * @returns {number} The ID of the newly inserted user.
 * @throws {Error} If there is an error inserting the user into the database.
 */
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
/**
 * Retrieves products from the database using a Promise.
 * @returns {Promise} A Promise that resolves with the first product from the database, or null if no products are found.
 * @throws {Error} If there is an error while querying the database.
 */
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
/**
 * Inserts a new product into the database with the provided information.
 * @param {string} product_name - The name of the product.
 * @param {string} product_description - The description of the product.
 * @param {number} price - The price of the product.
 * @param {number} stock_quantity - The quantity of the product in stock.
 * @param {string} imageUrl - The URL of the product image.
 * @returns {Promise<number>} A promise that resolves to the number of affected rows in the database.
 */
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

/**
 * Deletes an image associated with a product from the database.
 * @param {number} productId - The ID of the product whose image is to be deleted.
 * @returns {Promise<void>} A promise that resolves once the image is deleted.
 */
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

/**
 * Deletes a product from the database and its associated image.
 * @param {number} productId - The ID of the product to delete.
 * @returns {Promise<number>} A promise that resolves with the number of affected rows after deletion.
 */
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
  updateAppointmentStatus,
  deleteAppointmentByUserId,
  getAppointmentsByUserId,
  getUserAppointmentsToken,
};

const express = require("express");
const AppointmentRouter = express.Router();
const { verifyAccessesToken } = require("../JwtTokenWork");
const {
  getBarberServices,
  getBarbers,
  canScheduleAppointment,
  getBarberIdByFirstName,
  getBarbersWorkingHoursByDate,
  getAppointmentsByDate,
  insertAppointment,
} = require("../databaseWork");

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
 * Route to get the list of available barbers for scheduling appointments.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves once the list of barbers is retrieved and sent as a JSON response.
 */
AppointmentRouter.get("/getBarbers", verifyAccessesToken, async (req, res) => {
  const canSchedule = await canScheduleAppointment(req.payload.userID);
  if (!canSchedule) {
    return res.status(200).json({ hasAppointment: true });
  }
  try {
    const barbers = await getBarbers();
    return res.status(200).json(barbers);
  } catch (error) {
    return res.json({ error: error.message }).status(500);
  }
});

/**
 * Route to get services for a specific barber.
 * @param {string} "/getServices" - The endpoint for getting services.
 * @param {function} verifyAccessesToken - Middleware function to verify access token.
 * @param {function} async (req, res) - Asynchronous function to handle request and response.
 * @param {string} req.query.barbersName - The name of the barber to get services for.
 * @returns {object} JSON response with barber services or error message.
 */
AppointmentRouter.get("/getServices", verifyAccessesToken, async (req, res) => {
  const { barbersName } = req.query;
  try {
    const Services = await getBarberServices(barbersName);
    return res.status(200).json(Services);
  } catch (error) {
    return res.json({ error: error.message }).status(500);
  }
});

/**
 * Route to get the available hours for a specific barber on a selected date.
 * @param {string} "/getAvailableHours" - The endpoint for getting available hours.
 * @param {function} verifyAccessesToken - Middleware function to verify access token.
 * @param {function} async (req, res) - Asynchronous function to handle the request and response.
 * @returns {Array} An array of available hours for the barber on the selected date.
 */
AppointmentRouter.get(
  "/getAvailableHours",
  verifyAccessesToken,
  async (req, res) => {
    //req : {first_name, dayOfWeek, SelectedDate}
    // 3: extract open spots from the database of a certain barber and a certain date ( (all working hours - breaks) - taken hours )
    //TODO: add the database functions
    const { first_name, selectedDate } = req.query;
    let dayOfWeek = getDayOfWeek(selectedDate);
    try {
      const barberId = await getBarberIdByFirstName(first_name);
      // an array of time (HH:MM) that represents the selected barbers available times of service
      const workingHours =
        (await getBarbersWorkingHoursByDate(barberId, dayOfWeek)) || [];
      //an array of time (HH:MM) that represents taken slots in the schedule

      if (workingHours.length < 0) {
        return res.status(200).json([]);
      }
      const occupiedAppointments = await getAppointmentsByDate(selectedDate);

      const filteredArray = workingHours.filter(
        (item) => !occupiedAppointments.includes(item)
      );
      return res.status(200).json(filteredArray);
    } catch (e) {
      return res.json({ error: e.message }).status(500);
    }
  }
);

/**
 * Route to insert a new appointment into the database.
 * @param {string} "/InsertAppointment" - The endpoint for inserting an appointment.
 * @param {function} verifyAccessesToken - Middleware function to verify access token.
 * @param {function} async (req, res) - Asynchronous function to handle the request and response.
 * @param {object} req.body - The request body containing barbersName, date, time, and service.
 * @param {object} req.payload - The payload extracted from the access token containing userID.
 * @returns {object} JSON response indicating success or failure of the appointment insertion.
 */
AppointmentRouter.post(
  "/InsertAppointment",
  verifyAccessesToken,
  async (req, res) => {
    const { barbersName, date, time, service } = req.body;
    const { userID } = req.payload;
    try {
      const affectedRows = await insertAppointment(
        userID,
        barbersName,
        date,
        time,
        service.name
      );
      if (affectedRows === 1) {
        return res
          .status(200)
          .json({ message: "Appointment successfully appointed " });
      }

      return res.sendStatus(409);
    } catch (error) {
      console.error(error);
      return res.json({ error: "error inserting appointment" }).status(500);
    }
  }
);

AppointmentRouter.delete("deleteAppointment", (req, res) => {
  console.table(req.body);
  res.send(req.body);
});

module.exports = AppointmentRouter;

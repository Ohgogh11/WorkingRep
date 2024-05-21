const express = require("express");
const AppointmentRouter = express.Router();
const {
  scheduleSMSReminder,
  cancelSMSReminder,
} = require("../reminderService");
const {
  verifyAccessesToken,
  createJwtToken,
  verifyConfirmationToken,
} = require("../JwtTokenWork");
const {
  getBarberServices,
  getBarbers,
  canScheduleAppointment,
  getBarberIdByFirstName,
  getBarbersWorkingHoursByDate,
  getAppointmentsByDate,
  insertAppointment,
  deleteAppointmentByUserId,
  updateAppointmentStatus,
  getAppointmentsByUserId,
  getUserById,
  getUserAppointmentsToken,
} = require("../databaseWork");
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
    try {
      const barberId = await getBarberIdByFirstName(first_name);
      // an array of time (HH:MM) that represents the selected barbers available times of service
      const workingHours =
        (await getBarbersWorkingHoursByDate(barberId, selectedDate)) || [];
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
      const confirmationToken = createJwtToken(
        { userID: parseInt(userID) },
        process.env.JWT_SECRET
      );
      const affectedRows = await insertAppointment(
        parseInt(userID),
        barbersName,
        date,
        time,
        service.name,
        confirmationToken
      );
      if (affectedRows === 1) {
        const user = await getUserById(userID);
        scheduleSMSReminder(
          new Date(`${date}T${time}`),
          user.phone_number,
          userID,
          user.first_name,
          confirmationToken
        );
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
/**
 * Route to delete an appointment by user ID after verifying confirmation token.
 * @param {string} "/deleteAppointment" - The endpoint for deleting an appointment.
 * @param {function} verifyConfirmationToken - Middleware function to verify confirmation token.
 * @param {function} async (req, res) - Asynchronous function to handle the request and response.
 * @returns None
 */
AppointmentRouter.delete(
  "/deleteAppointment",
  verifyConfirmationToken,
  async (req, res) => {
    const { userID } = req.payload;
    try {
      const success = await deleteAppointmentByUserId(parseInt(userID));
      if (success) {
        cancelSMSReminder(userID); // if there are pending reminders delete them
        return res
          .status(200)
          .json({ message: "Appointment successfully Deleted Confirmed " });
      }
      throw new Error("db error");
    } catch (error) {
      return res.json({ error: error }).status(500);
    }
  }
);
/**
 * PUT endpoint to confirm an appointment after verifying the confirmation token.
 * @param {string} "/confirmAppointment" - The route for confirming an appointment.
 * @param {function} verifyConfirmationToken - Middleware function to verify the confirmation token.
 * @param {function} async (req, res) - Asynchronous function to handle the request and response.
 * @returns {object} JSON response with a success message if the appointment is confirmed, or an error message if there is a database error.
 */
AppointmentRouter.put(
  "/confirmAppointment",
  verifyConfirmationToken,
  async (req, res) => {
    const { userID } = req.payload;
    try {
      const success = await updateAppointmentStatus(
        parseInt(userID),
        "confirmed"
      );
      if (success) {
        return res
          .status(200)
          .json({ message: "Appointment successfully Confirmed " });
      }
      throw new Error("db error");
    } catch (error) {
      return res.json({ error: error }).status(500);
    }
  }
);
/**
 * Route to get an appointment for a specific user ID after verifying the confirmation token.
 * @param {string} "/getAppointment" - The endpoint for getting the appointment.
 * @param {function} verifyConfirmationToken - Middleware function to verify the confirmation token.
 * @param {function} async (req, res) - Asynchronous function to handle the request and response.
 * @returns {object} JSON response with the appointment details or an error message.
 */
AppointmentRouter.get(
  "/getAppointment",
  verifyConfirmationToken,
  async (req, res) => {
    const { userID } = req.payload;
    try {
      const appointment = await getAppointmentsByUserId(parseInt(userID));
      if (appointment) {
        return res.status(200).json(appointment);
      }
      throw new Error("db error");
    } catch (error) {
      return res.json({ error: error }).status(500);
    }
  }
);
/**
 * Route handler for getting the appointment link for a user.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves once the appointment link is retrieved.
 */
AppointmentRouter.get(
  "/getAppointmentLink",
  verifyAccessesToken,
  async (req, res) => {
    try {
      const obj = await getUserAppointmentsToken(req.payload.userID);
      let confirmation_token = obj?.confirmation_token;
      console.log(confirmation_token);
      if (confirmation_token) {
        let link = `${process.env.FRONTEND}/AppointmentConfirmation/${confirmation_token}`;
        return res.json(link).status(200);
      }
      return res.sendStatus(409);
    } catch (error) {
      console.error(error);
      return res.json({ error: "error inserting appointment" }).status(500);
    }
  }
);
module.exports = AppointmentRouter;

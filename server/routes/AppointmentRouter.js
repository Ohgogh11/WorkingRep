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

AppointmentRouter.get("/getServices", verifyAccessesToken, async (req, res) => {
  const { barbersName } = req.query;
  try {
    const Services = await getBarberServices(barbersName);
    return res.status(200).json(Services);
  } catch (error) {
    return res.json({ error: error.message }).status(500);
  }
});

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

//TODO: add a confirm appointments Changes the status of an appointment to confirmed (first check if there is an appointment for this user)
AppointmentRouter.put(
  "/ConfirmAppointment",
  verifyAccessesToken,
  async (req, res) => {}
);

AppointmentRouter.delete("deleteAppointment", (req, res) => {
  console.table(req.body);
  res.send(req.body);
});

module.exports = AppointmentRouter;

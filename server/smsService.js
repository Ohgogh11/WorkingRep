/**
 * Sends an SMS reminder to the specified phone number with the appointment details.
 * @param {string} phoneNumber - The phone number to send the reminder to.
 * @param {string} name - The name of the person with the appointment.
 * @param {Date} dateTime - The date and time of the appointment.
 * @param {string} token - The token for authentication.
 * @returns None
 */
function sendSMSReminder(phoneNumber, name, dateTime, token) {
  const link = `${process.env.FRONTEND}/confirmAppointment/${token}`;
  const message = `היי ${name}, רצינו להזכיר שיש לך תור לAlphamen Barbershop ${formatDate(
    dateTime
  )} נא לאשר הגעה בקישור:${link}`;
  console.log(message);
}
/**
 * Formats a given date into a string representation in Hebrew.
 * @param {Date} date - The date to format.
 * @returns {string} A formatted string representing the date in Hebrew.
 */
function formatDate(date) {
  date = new Date(date);
  const daysOfWeek = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
  const months = [
    "ינואר",
    "פברואר",
    "מרץ",
    "אפריל",
    "מאי",
    "יוני",
    "יולי",
    "אוגוסט",
    "ספטמבר",
    "אוקטובר",
    "נובמבר",
    "דצמבר",
  ];

  const dayOfWeek = daysOfWeek[date.getDay()];
  const dayOfMonth = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hour = date.getHours();
  const minutes = date.getMinutes();

  return `ביום ${dayOfWeek}, ${dayOfMonth} ב${month} ${year} בשעה ${hour}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;
}
module.exports = { sendSMSReminder };

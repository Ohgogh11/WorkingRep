const schedule = require("node-schedule");
const { sendSMSReminder } = require("./smsService"); // Import the function to send SMS reminders

// Object to store scheduled jobs
const scheduledJobs = {}; // todo add to database

// Function to schedule SMS reminder for an appointment
/**
 * Schedule an SMS reminder for a given appointment.
 * @param {Date} appointmentDateTime - The date and time of the appointment.
 * @param {string} phoneNumber - The phone number to send the reminder to.
 * @param {string} user_id - The user ID associated with the appointment.
 * @param {string} name - The name of the user with the appointment.
 * @param {string} confirmationToken - The token to confirm the appointment.
 * @returns None
 */
function scheduleSMSReminder(
  appointmentDateTime,
  phoneNumber,
  user_id,
  name,
  confirmationToken
) {
  try {
    // Calculate reminder time (3 hours before appointment)
    const reminderDateTime = new Date(appointmentDateTime);
    reminderDateTime.setHours(reminderDateTime.getHours() - 3); // 3 hours before appointment

    // Schedule reminder using node-schedule
    //TODO: change Date.now() + 3000 to reminderDateTime
    const job = schedule.scheduleJob(Date.now() + 3000, async () => {
      // Send reminder SMS
      await sendSMSReminder(
        phoneNumber,
        name,
        appointmentDateTime,
        confirmationToken
      );
      // Remove job from scheduledJobs after executing
      delete scheduledJobs[user_id];
    });

    // Store the job in scheduledJobs for future reference
    scheduledJobs[user_id] = job;
    console.log(scheduledJobs);
  } catch (error) {
    console.error("Error scheduling SMS reminder:", error);
  }
}

// Function to cancel a scheduled SMS reminder
/**
 * Cancels the SMS reminder for the specified user ID if it exists.
 * @param {string} user_id - The ID of the user for whom the reminder needs to be cancelled.
 * @returns None
 */
function cancelSMSReminder(user_id) {
  if (scheduledJobs[user_id]) {
    scheduledJobs[user_id].cancel(); // Cancel the scheduled job
    delete scheduledJobs[user_id]; // Remove job from scheduledJobs
    console.log(`Cancelled reminder for user ID: ${user_id}`);
  } else {
    console.log(`No reminder scheduled for user ID: ${user_id}`);
  }
}

module.exports = { scheduleSMSReminder, cancelSMSReminder };

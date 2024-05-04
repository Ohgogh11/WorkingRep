import React, { useState } from "react";

const days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export function WorkingHoursComponent() {
  const [workingHours, setWorkingHours] = useState(
    days.reduce((acc, day) => {
      acc[day] = { start: "", end: "" };
      return acc;
    }, {})
  );

  const handleInputChange = (event, day) => {
    setWorkingHours({
      ...workingHours,
      [day]: {
        ...workingHours[day],
        [event.target.name]: event.target.value,
      },
    });
  };

  return (
    <div className="container mx-auto py-10">
      <table className="table-auto w-full sm:border border-gray-200 shadow rounded-md">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-medium">
            <th className="px-4 py-2">Day</th>
            <th className="px-4 py-2 max-w-80">Starting Hour</th>
            <th className="px-4 py-2">Ending Hour</th>
          </tr>
        </thead>
        <tbody>
          {days.map((day) => (
            <tr key={day} className="sm:border-b border-gray-200">
              <td className="px-4 py-2 w-52">{day}</td>
              <td className="px-1 py-2">
                <input
                  type={
                    /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent)
                      ? "time"
                      : "time"
                  } // Use time picker on mobile devices
                  name="start"
                  id={`start-${day}`}
                  className="rounded-md border max-w-72 border-gray-300 p-1 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                  value={workingHours[day].start}
                  onChange={(event) => handleInputChange(event, day)}
                />
              </td>
              <td className="px-1 py-2">
                <input
                  type={
                    /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent)
                      ? "time"
                      : "time"
                  } // Use time picker on mobile devices
                  name="end"
                  id={`end-${day}`}
                  className="rounded-md border max-w-72  border-gray-300 p-1 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                  value={workingHours[day].end}
                  onChange={(event) => handleInputChange(event, day)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // const handleWorkingHoursChange = (day, changes) => {
  //   setWorkingHours((prevWorkingHours) => ({
  //     ...prevWorkingHours,
  //     [day]: changes,
  //   }));
  // };
  // const handleTimeChange = (day, timeSlot, event) => {
  //   handleWorkingHoursChange(day, {
  //     ...workingHours[day],
  //     [timeSlot]: event.target.value,
  //   });
  // };

  // return (
  //   <div className="mb-4">
  //     <h2 className="text-lg font-medium mb-2">Working Hours</h2>
  //     {days.map((day) => (
  //       <div key={day} className="flex gap-3 mb-2">
  //         <label htmlFor={`${day}-start`} className="text-sm font-medium">
  //           {day[0].toUpperCase() + day.slice(1)} Start Time:
  //         </label>
  //         <input
  //           name={day}
  //           type="time"
  //           id={`${day}-start`}
  //           className="rounded-md border w-32  border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
  //           value={workingHours[day]?.start}
  //           onChange={(e) => handleTimeChange(day, "start", e)}
  //         />
  //         <label htmlFor={`${day}-end`} className="text-sm font-medium">
  //           {day[0].toUpperCase() + day.slice(1)} End Time:
  //         </label>
  //         <input
  //           type="time"
  //           id={`${day}-end`}
  //           className="rounded-md w-32 border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
  //           value={workingHours[day]?.end}
  //           onChange={(e) => handleTimeChange(day, "end", e)}
  //         />
  //       </div>
  //     ))}
  //     {/* Add functionality for breaks if needed */}
  //   </div>
  // );
}

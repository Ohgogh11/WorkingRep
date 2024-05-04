import React, { useState } from "react";
import ReactConfetti from "react-confetti";
import { PiChecksBold } from "react-icons/pi";
export const SuccessfulAppointment = () => {
  const [showConfetti, setShowConfetti] = useState(true);

  // Function to hide confetti after 3 seconds
  const hideConfetti = () => {
    setShowConfetti(false);
  };

  // Start the timeout to hide confetti after 3 seconds
  setTimeout(hideConfetti, 5000);

  return (
    <>
      {showConfetti && <ReactConfetti className="w-full h-full" />}
      <div className="text-center text-gray-900">
        <div className="flex justify-center text-green-500 py-2">
          <PiChecksBold size={50} />
        </div>
        <div className="font-bold text-xl">!נתראה</div>
        <div className="font-semibold py-2">.התור שלך תקבע בהצלחה</div>
        <div className="text-xs ">
          בקרוב מאוד תקבלו הודעה עם כל פרטי התור ואני כמובן נתזכר אתכם לקראת
          התור
        </div>
      </div>
    </>
  );
};

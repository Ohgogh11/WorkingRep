import React from "react";

const StepperControl = ({ handleClick, currentStep, steps }) => {
  return (
    <div className=" container flex justify-around mt-8 mb-8">
      {/* next button */}
      <button
        onClick={() => handleClick("next")}
        className=" bg-white text-green-400 uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-300 hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out">
        הבאה
      </button>
      {/* back Button */}
      <button
        onClick={() => handleClick()}
        className={` bg-white text-slate-400 uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-300 hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out ${
          currentStep === 1 ? " opacity-50 cursor-not-allowed" : " "
        }`}>
        אחורה
      </button>
    </div>
  );
};

export default StepperControl;

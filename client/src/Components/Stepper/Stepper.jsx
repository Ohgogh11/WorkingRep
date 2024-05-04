import React, { useEffect, useRef, useState } from "react";

const Stepper = ({ steps, currentStep }) => {
  const [newStep, setNewStep] = useState([]);
  const stepRef = useRef();

  const updateStep = (stepNumber, steps) => {
    const newSteps = [...steps];
    let count = 0;
    while (count < steps.length) {
      if (count === stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlight: true,
          selected: true,
          completed: true,
        };
        count++;
      } else if (count < stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlight: false,
          selected: true,
          completed: true,
        };
        count++;
      } else {
        newSteps[count] = {
          ...newSteps[count],
          highlight: false,
          selected: false,
          completed: false,
        };
        count++;
      }
    }
    return newSteps;
  };

  useEffect(() => {
    const stepsState = steps.map((step, index) =>
      Object.assign(
        {},
        {
          description: step,
          completed: false,
          highlight: index === 0,
          selected: index === 0,
        }
      )
    );
    stepRef.current = stepsState;
    const current = updateStep(currentStep - 1, stepRef.current);
    setNewStep(current);
    return () => {};
  }, [steps, currentStep]);

  const displaySteps = newStep.map((step, index) => {
    return (
      <div
        key={index}
        className={
          index !== newStep.length - 1
            ? "w-full flex flex-row-reverse items-center"
            : "flex items-center"
        }>
        <div className="relative item-center text-teal-600">
          <div
            className={`rounded-full transition duration-500 ease-in-out border-2 border-gray-300 size-10 flex item-center justify-center py-1.5 ${
              step.selected
                ? "bg-green-600 text-white font-bold border border-green-600"
                : ""
            }`}>
            {/* Display number */}
            {step.completed ? (
              <span className="text-white font-bold text-xl">&#10003;</span>
            ) : (
              index + 1
            )}
          </div>
          <div
            className={` absolute top-0 -left-7 text-center mt-12 w-24 text-xs font-medium uppercase ${
              step.highlight ? "text-gray-900" : "text-gray-400"
            } `}>
            {/* display description */}
            {step.description}
          </div>
        </div>
        <div
          className={`flex-auto border-t-2 transition duration-500 ease-in-out ${
            step.completed ? "border-green-600" : "border-gray-300"
          }`}>
          {/* display line */}
        </div>
      </div>
    );
  });

  return (
    <div className="mx-4 p-4 flex flex-row-reverse justify-between items-center ">
      {displaySteps}
    </div>
  );
};

export default Stepper;

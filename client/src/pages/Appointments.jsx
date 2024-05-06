import React, { useState } from "react";
import Stepper from "../Components/Stepper/Stepper";
import StepperControl from "../Components/Stepper/StepperControl";
import ServiceSelection from "../Components/steps/ServiceSelection";
import BarberSelection from "../Components/steps/BarberSelection";
import DateTimeSelection from "../Components/steps/DateTimeSelection";
import Complete from "../Components/steps/Complete";
import { StepperContext } from "../contexts/StepperContext";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

function Appointments() {
  const [formData, setFormData] = useState({
    barbersName: "",
    service: "",
    date: "",
    time: "",
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [finishedStep, setFinishedStep] = useState(false);
  const headerAuth = useAuthHeader();
  const authUser = useAuthUser();

  const steps = ["בחירת ספר", "סוג השירות", "תאריך ושעה", "סיום ואישור"];

  const displaySteps = (step) => {
    switch (step) {
      case 1:
        return <BarberSelection />;
      case 2:
        return <ServiceSelection />;
      case 3:
        return <DateTimeSelection />;
      case 4:
        return <Complete handleClick={handleClick} />;
    }
  };

  const handleClick = (direction) => {
    if (!finishedStep && direction) {
      return;
    }

    let newStep = currentStep;
    direction === "next" ? newStep++ : newStep--;
    newStep > 0 &&
      newStep <= steps.length &&
      setCurrentStep((prev) => {
        if (prev < newStep) {
          setFinishedStep(false);
        }
        return newStep;
      });
  };

  return (
    <div className=" overflow-x-hidden overflow-auto  w-full h-Screen flex justify-center items-center">
      <div className=" container border md:w-1/2  mx-auto shadow-xl rounded-2xl pb-2 bg-white">
        <div className=" container horizontal mt-5">
          <Stepper steps={steps} currentStep={currentStep} />
          {/* display Components  */}
          <div className="my-10 p-10 pt-0 mb-0 px-5">
            <StepperContext.Provider
              value={{
                formData,
                setFormData,
                setFinishedStep,
                headerAuth,
                authUser,
              }}>
              {displaySteps(currentStep)}
            </StepperContext.Provider>
          </div>
        </div>

        {currentStep !== steps.length && (
          <StepperControl
            handleClick={handleClick}
            currentStep={currentStep}
            steps={steps}
          />
        )}
      </div>
    </div>
  );
}

export default Appointments;

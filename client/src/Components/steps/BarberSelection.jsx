import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { GiOfficeChair } from "react-icons/gi";
import { StepperContext } from "../../contexts/StepperContext";

function BarberSelection() {
  const { formData, setFormData, setFinishedStep, headerAuth } =
    useContext(StepperContext);
  const [selected, setSelected] = useState(null);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["Barbers"],
    queryFn: async () => {
      const response = await axios.get("/api/Appointments/getBarbers", {
        headers: { authorization: headerAuth },
      });
      return response.data;
    },
  });
  useEffect(() => {
    formData.barbersName === ""
      ? setFinishedStep(false)
      : setFinishedStep(true);
  }, [formData.barbersName]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data + {error.message}</div>;
  }

  //TODO: add a already has an appointment component
  if (data && data.hasAppointment) {
    return <div>You already have an appointment.</div>;
  }

  const handleClick = (first_name, index) => {
    setFormData((prev) => {
      const updatedFormData = { ...prev, barbersName: first_name };
      setSelected(index);
      return updatedFormData;
    });
  };
  return (
    <div>
      <h1 className='font-bold text-xl text-end mb-10'>בחרו את נותן השירות</h1>
      <div className='flex gap-14 justify-center'>
        {data.map((barber, index) => {
          return (
            <button
              key={index}
              className={`text-xl ${selected === index ? "text-blue-500" : ""}`}
              onClick={() => handleClick(barber.first_name, index)}>
              {barber.first_name}
              <GiOfficeChair size={50} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default BarberSelection;

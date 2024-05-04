import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { StepperContext } from "../../contexts/StepperContext";

function ServiceSelection() {
  const { formData, setFormData, setFinishedStep, headerAuth } =
    useContext(StepperContext);
  const [selected, setSelected] = useState(null);
  const { data, isLoading, isError, error, status } = useQuery({
    queryKey: ["Service"],
    queryFn: async () => {
      const response = await axios.get(
        "http://localhost:5000/api/Appointments/getServices",
        {
          params: { barbersName: formData.barbersName },
          headers: { authorization: headerAuth },
        }
      );
      return response.data;
    },
  });
  useEffect(() => {
    formData.service === "" ? setFinishedStep(false) : setFinishedStep(true);
  }, [formData.service]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data + {error.message}</div>;
  }

  

  const handleClick = (service) => {
    setSelected(service.name);
    setFormData((prev) => {
      const updatedFormData = { ...prev, service: service };
      console.table(updatedFormData);
      return updatedFormData;
    });
  };

  return (
    <div>
      <h1 className="font-bold text-xl text-end mb-5">בחרו את סוג השירות</h1>
      <div className="flex flex-col items-center gap-3">
        {data.map((service, index) => {
          return (
            <button
              onClick={() => handleClick(service)}
              key={index}
              className={`h-[60px] container border pr-1 pl-3 text-end rounded-md flex justify-between items-center max-w-lg ${
                selected === service.name ? "border-blue-500" : ""
              } `}>
              <ion-icon name="chevron-back-outline"></ion-icon>
              <div className="">
                <div className=" pt-2">
                  <small className=" bg-gray-200 rounded-md text-[11px] px-1 mr-1">
                    &#x20AA;{service.initial_cost}
                  </small>
                  <small className=" bg-gray-200 rounded-md px-1 text-[11px]">
                    30min
                  </small>
                </div>
                <h1 className="font-bold text-[13px] h-fit relative -top-0.5">
                  {service.name}
                </h1>
                <small className="text-[11px] relative -top-2">
                  {service.description}
                </small>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ServiceSelection;

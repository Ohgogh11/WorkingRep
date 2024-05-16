import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Link } from "react-router-dom";

function AppointmentConfirmationLink({ children, className }) {
  const header = useAuthHeader();

  const { data, isError, error, isSuccess } = useQuery({
    queryKey: ["AppointmentConfirmationLink"],
    queryFn: () => {
      return new Promise(async (resolve, reject) => {
        try {
          const { data } = await axios.get(
            "/api/appointments/getAppointmentLink",
            { headers: { authorization: header } }
          );
          if (data) {
            console.log(data);
            return resolve(data);
          }
          throw new Error("no Data found");
        } catch (error) {
          reject(error);
        }
      });
    },
  });

  return (
    <Link to={data ? data : "/"} className={className}>
      {children}
    </Link>
  );
}

export default AppointmentConfirmationLink;

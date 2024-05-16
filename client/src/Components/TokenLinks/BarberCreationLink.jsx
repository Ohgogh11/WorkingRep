import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Link } from "react-router-dom";

function BarberCreationLink({ children, className }) {
  const header = useAuthHeader();

  const { data, isError, error, isSuccess } = useQuery({
    queryKey: ["token"],
    queryFn: async () => {
      const response = await axios.get("/api/admin/BarberToken/BarberLink", {
        headers: { authorization: header },
      });
      return response.data.link;
    },
  });

  return (
    <Link to={data ? data : "/"} className={className}>
      {children}
    </Link>
  );
}

export default BarberCreationLink;

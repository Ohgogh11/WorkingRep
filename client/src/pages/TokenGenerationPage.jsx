// TokenGenerationPage.js
import React, { useRef } from "react";
import axios from "axios"; // Import Axios for making HTTP requests
import { Link } from "react-router-dom";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useQuery } from "@tanstack/react-query";

// async function fetchToken(headerAuth) {
//   const response = await axios.get(
//     "http://localhost:5000/api/admin/BarberToken",
//     {
//       headers: { authorization: headerAuth },
//     }
//   );
//   return response;
// }

const TokenGenerationPage = () => {
  const headerAuth = useAuthHeader();
  const linkRef = useRef(null);
  const { data, status, error, refetch } = useQuery({
    queryKey: ["token"],
    queryFn: async () => {
      const response = await axios.get(
        "http://192.168.1.170:5000/api/admin/BarberToken/BarberLink",
        {
          headers: { authorization: headerAuth },
        }
      );
      return response.data;
    },
  });

  const copyToClipboard = () => {
    if (linkRef.current) {
      navigator.clipboard
        .writeText(linkRef.current)
        .then(() => {
          alert("text copied to clipboard");
        })
        .catch(() => {
          alert("Failed to copy text to clipboard.");
        });
    }
  };

  if (status === "pending") {
    return <div>Loading token...</div>;
  }

  if (status === "error") {
    return <div>Error fetching token : {error.message} </div>;
  }

  return (
    <div className=" flex flex-col text-xl items-center justify-start w-full gap-10 h-full-Screen">
      <h1 className="pt-20 text-3xl">Token Generation Page</h1>
      <Link
        type="text"
        className="h-10 w-full text-center hover:text-sky-700"
        to={data.link} // ! changed from data?.data.link
        ref={linkRef}>
        {data.link}
      </Link>
      <div className="flex gap-10">
        <button onClick={refetch}>Generate New Link</button>
        <button type="button" onClick={copyToClipboard}>
          Copy To ClipBoard
        </button>
      </div>
    </div>
  );
};

export default TokenGenerationPage;

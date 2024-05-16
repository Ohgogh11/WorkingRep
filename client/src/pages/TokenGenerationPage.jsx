// TokenGenerationPage.js
import React, { useRef } from "react";
import axios from "axios"; // Import Axios for making HTTP requests
import { Link } from "react-router-dom";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useQuery } from "@tanstack/react-query";

const TokenGenerationPage = () => {
  const headerAuth = useAuthHeader();
  const linkRef = useRef(null);
  const { data, status, error, refetch } = useQuery({
    queryKey: ["token"],
    queryFn: async () => {
      const response = await axios.get("/api/admin/BarberToken/BarberLink", {
        headers: { authorization: headerAuth },
      });
      return response.data.link;
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
    <div className=' flex flex-col text-xl items-center justify-start w-full gap-10 h-full-Screen'>
      <h1 className='pt-20 text-3xl'>קישור להוספת ספר חדש</h1>
      <Link
        type='text'
        className='h-10 w-full text-center hover:text-sky-700 text-wrap'
        to={data} // ! changed from data?.data.link
        ref={linkRef}>
        {maskLink(data)}
      </Link>
      <div className='flex gap-10'>
        <button onClick={refetch}>קישור חדש</button>
        <button type='button' onClick={copyToClipboard}>
          העתיק קישור
        </button>
      </div>
    </div>
  );
};

function maskLink(link) {
  link = String(link);
  return link.substring(0, link.lastIndexOf("/") + 10);
}

export default TokenGenerationPage;

// TokenGenerationPage.js
import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios"; // Import Axios for making HTTP requests
import { Link } from "react-router-dom";

const TokenGenerationPage = () => {
  const linkRef = useRef(null);
  const [toggle, setToggle] = useState(true);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null);

  const fetchToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/AdminToken");
      setToken(response.data.token);
      localStorage.setItem("authToken", response.data.token); // Or sessionStorage.setItem('authToken', response.data.token)
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false); // Set loading to false even on error
    }
  };
  // Fetch token on component mount and potentially from storage (optional)
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
      setIsLoading(false); // Set loading to false as token is retrieved
    } else {
      fetchToken();
    }
  }, [toggle]);

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
  if (isLoading) {
    return <div>Loading token...</div>;
  }

  if (error) {
    return <div>Error fetching token: {error.message}</div>;
  }

  if (!token) {
    // Handle scenario where token cannot be retrieved (e.g., redirect to login)
    return <div>Failed to obtain token. Please log in.</div>;
  }

  return (
    <div className=" flex flex-col text-xl items-center justify-start w-full gap-10 h-full-Screen">
      <h1 className="pt-20 text-3xl">Token Generation Page</h1>
      <Link
        type="text"
        className="h-10 w-full text-center hover:text-sky-700"
        to={`http://localhost:5000/Create-Barber/${token}`}
        ref={linkRef}>
        {`http://localhost:5000/Create-Barber/${token}`}
      </Link>
      <div className="flex gap-10">
        <button onClick={() => fetchToken()}>Generate New Link</button>
        <button type="button" onClick={copyToClipboard}>
          Copy To ClipBoard
        </button>
      </div>
    </div>
  );
};

export default TokenGenerationPage;

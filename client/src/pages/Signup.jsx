import React, { useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import Icon from "../Components/NavBar/Icon";

function Signup() {
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [seePassword, setSeePassword] = useState(false);
  const [seeConfirmPassword, setSeeConfirmPassword] = useState(false);
  const isEmpty = (str) => !str || !str.trim();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      isEmpty(first_name) ||
      isEmpty(last_name) ||
      isEmpty(email) ||
      isEmpty(phone_number) ||
      isEmpty(password) ||
      isEmpty(confirmPassword)
    ) {
      setShowError(true);
      setErrorMessage(
        "All fields are required. Please fill in all the fields."
      );
      return;
    }
    if (password !== confirmPassword) {
      setShowError(true);
      setErrorMessage(
        "Passwords do not match. Please make sure your passwords match."
      );
      return;
    }

    setIsSigningIn(true);
    //http://localhost:5000/api/signup
    try {
      const response = await axios.post("http://localhost:5000/api/signup", {
        email,
        first_name,
        last_name,
        phone_number,
        password,
      });
      console.log(response.data);

      // TODO: add error message
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || "Loging failed");
      } else {
        setErrorMessage("Network error. Please try again later");
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  const dismissError = () => {
    setShowError(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex-col h-screen content-center text-sm bg-[#161b22] text-[#f0f6fc] overflow-hidden">
      <div className="flex justify-center pt-4 pb-6">
        <Icon />
      </div>
      <main className=" flex justify-center">
        <div className="flex-col justify-center mt-0 m-6 px-4 max-w-xs">
          <h1 className=" text-center text-2xl">!נעים להכיר וברוך הבאה</h1>
          <div
            name="Input logger"
            className={`${
              !showError ? "hidden" : "flex"
            } justify-between border border-red-600 rounded-md m-0 mb-2 p-4 mt-4 bg-red-500 bg-opacity-10`}>
            {errorMessage}
            <button
              type="button"
              className=" flex items-center"
              onClick={dismissError}>
              <ion-icon name="close" />
            </button>
          </div>
          <div
            id="container"
            className=" mt-4 p-4 rounded-md border border-gray-700 text-end ">
            <div className="flex flex-row-reverse gap-3">
              <div className="flex flex-col">
                {/* firstName_field */}
                <label htmlFor="FirstName_field">שם פרטי</label>
                <input
                  required={true}
                  type="text"
                  name="login"
                  id="FirstName_field"
                  placeholder="שם פרטי"
                  onChange={(e) => setFirstName(e.target.value)}
                  className="bg-transparent w-full px-3 py-1 mt-1 mb-4 rounded-md border border-gray-700 focus:border-red-700 text-end outline-none"
                />
              </div>
              <div className="flex flex-col">
                {/* LastName_field */}
                <label htmlFor="lastName_field">שם משפחה</label>
                <input
                  required={true}
                  type="text"
                  name="login"
                  id="lastName_field"
                  placeholder="שם משפחה"
                  onChange={(e) => setLastName(e.target.value)}
                  className="bg-transparent w-full px-3 py-1 mt-1 mb-4 rounded-md border border-gray-700 focus:border-red-700 text-end outline-none"
                />
              </div>
            </div>
            {/* phoneNumber_field */}
            <label htmlFor="phoneNumber_field" className=" flex-none">
              טלפון
            </label>
            <input
              required={true}
              type="tel"
              name="login"
              id="phoneNumber_field"
              pattern="^05\d{8}$"
              title="Invalid Israeli phone number starting with 05"
              placeholder="05XXXXXXXX"
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="bg-transparent w-full px-3 py-1 mt-1 mb-4 rounded-md border border-gray-700 focus:border-red-700 text-end outline-none"
            />
            {/*email_field */}
            <label htmlFor="email_field">מייל</label>
            <input
              required={true}
              type="email"
              name="login"
              id="email_field"
              placeholder="robot@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent w-full px-3 py-1 mt-1 mb-4 rounded-md border border-gray-700 focus:border-red-700 text-end outline-none"
            />

            {/* password_field */}
            <label htmlFor="password_field">סיסמה</label>
            <div className="flex flex-row-reverse items-center mt-1 mb-4 rounded-md border border-gray-700">
              <input
                required={true}
                type={!seePassword ? "password" : "text"}
                pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"
                title="Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
                name="password"
                id="password_field"
                onChange={(e) => setPassword(e.target.value)}
                className=" bg-transparent w-full px-3 py-1 text-end outline-none"
              />
              <button
                type="button"
                className="flex h-full items-center w-8 justify-center text-xl"
                onClick={() => setSeePassword((prev) => !prev)}>
                {!seePassword ? (
                  <ion-icon name="eye-outline"></ion-icon>
                ) : (
                  <ion-icon name="eye-off-outline"></ion-icon>
                )}
              </button>
            </div>
            <label htmlFor="password_field">אישור סיסמה</label>
            <div className="flex flex-row-reverse items-center mt-1 mb-4 rounded-md border border-gray-700">
              <input
                required={true}
                pattern={password}
                title="Passwords must match"
                type={!seeConfirmPassword ? "password" : "text"}
                name="confirmPassword"
                id="confirmPassword_field"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className=" bg-transparent w-full px-3 py-1   text-end outline-none"
              />
              <button
                type="button"
                className="flex h-full items-center w-8 justify-center text-xl"
                onClick={() => setSeeConfirmPassword((prev) => !prev)}>
                {!seeConfirmPassword ? (
                  <ion-icon name="eye-outline"></ion-icon>
                ) : (
                  <ion-icon name="eye-off-outline"></ion-icon>
                )}
              </button>
            </div>
            <input
              type="submit"
              id="submit"
              disabled={isSigningIn}
              value={isSigningIn ? "נרשם..." : "הרשמה"}
              className={`w-full ${
                isSigningIn
                  ? "bg-green-900 border border-green-900"
                  : "bg-green-700 border border-green-700 cursor-pointer"
              } px-4 py-1 rounded-md mt-2 `}
            />
            {/* divider */}
            <div
              name="divider"
              className="mt-4 flex justify-between items-center">
              <div className=" relative inline-block w-1/2 h-[1px] align-middle bg-[#30363d]" />
              <span className=" px-1">או</span>
              <div className=" relative inline-block w-1/2 h-[1px] align-middle bg-[#30363d]" />
            </div>
            {/* other sign in option */}
            <div
              name="other sign in"
              className="flex justify-evenly mt-4 text-2xl">
              <button type="button" className=" flex items-center ">
                <ion-icon name="logo-google" />
              </button>
              <button type="button" className=" flex items-center ">
                <ion-icon name="logo-twitter" />
              </button>
              <button type="button" className=" flex items-center ">
                <ion-icon name="logo-apple" />
              </button>
            </div>
          </div>
          <div
            name="Have an account"
            className="justify-center mt-4 border rounded-md border-gray-700 text-center">
            <div className=" mt-auto mb-auto p-4 flex justify-center gap-1">
              <Link to="/Login" className=" pl-1 text-[#2f81f7]">
                התחברו
              </Link>
              <div>?כבר יש משתמש</div>
            </div>
          </div>
        </div>
      </main>
    </form>
  );
}

export default Signup;

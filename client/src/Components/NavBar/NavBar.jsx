import React, { useState } from "react";
import Icon from "./Icon";
import NavLinks from "./NavLinks";
import LinkBtn from "./LinkBtn";
import Window from "./Window";
import IsSignedIn from "../IsSignedIn";
import SignOut from "../SignOut";

function Navbar2() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="header sticky top-0 w-full bg-[#161b22] text-white py-7 text-sm z-50 ">
      {/* DeskTop */}
      <div className="DesktopNav flex items-center px-4 mlg:hidden">
        <Icon className="mr-4" />
        <NavLinks className="flex-grow flex justify-between " />
      </div>
      {/* DynamicNav */}
      <div className="DynamicNav hidden mlg:flex justify-between items-center px-5">
        <IsSignedIn
          logged={
            <div className="w-20">
              <SignOut
                to="/Login"
                className="border rounded-md border-white px-2 py-1 flex items-center justify-center">
                התנתקות
              </SignOut>
            </div>
          }
          notLogged={
            <div className=" w-20">
              <LinkBtn
                to="/Login"
                content="התחברות"
                className="border border-white rounded-md p-1"
              />
            </div>
          }
        />
        <Icon className="" />
        <div className="w-20 flex justify-center">
          <button
            className="block lg:hidden focus:outline-none "
            onClick={handleClick}>
            <div
              className={`w-6 h-0.5 bg-white my-1 transition-all duration-300 ${
                isOpen ? "transform -rotate-45 translate-y-1" : ""
              }`}></div>
            <div
              className={`w-6 h-0.5 bg-white my-1 transition-all duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}></div>
            <div
              className={`w-6 h-0.5 bg-white my-1 transition-all duration-300 ${
                isOpen ? "transform rotate-45 -translate-y-2" : ""
              }`}></div>
          </button>
        </div>
      </div>
      {isOpen ? <Window /> : ""}
    </header>
  );
}

export default Navbar2;

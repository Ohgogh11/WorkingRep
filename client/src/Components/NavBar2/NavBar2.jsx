import React, { useState } from "react";
import { AiFillGithub } from 'react-icons/ai';
import Icon from "./Icon";
import NavLinks from "./NavLinks";
import LinkBtn from "./LinkBtn";
import Window from "./Window";


function Navbar2() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
      <header className="header bg-[#161b22] text-white py-4 text-sm font-mono">
        {/* DeskTop */}
        <div className="DesktopNav flex items-center px-4 mlg:hidden">
          <Icon className="mr-4" />
          <NavLinks className="flex-grow flex justify-between " />
        </div>
        {/* DynamicNav */}
        <div className="DynamicNav hidden mlg:flex items-center px-10">
          <div className="flex flex-grow">
            <LinkBtn to="/login" content="Sign in" className='border border-white rounded-md p-1' />
          </div>
          <Icon className=" absolute left-1/2 -translate-x-1/2" />
          <div className="flex justify-end flex-grow ">
            <button className="block lg:hidden focus:outline-none " onClick={handleClick}>
              <div className={`w-6 h-0.5 bg-white my-1 transition-all duration-300 ${isOpen ? 'transform -rotate-45 translate-y-1' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-white my-1 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-white my-1 transition-all duration-300 ${isOpen ? 'transform rotate-45 -translate-y-2' : ''}`}></div>
            </button>
          </div>
         </div>
         {isOpen ? <Window /> : ''}
       
      </header>
  )
}

export default Navbar2

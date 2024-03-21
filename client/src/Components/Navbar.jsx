import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillGithub } from 'react-icons/ai';
import { IoIosSearch } from "react-icons/io";

const Navbar = () => {
  const links = () => {
    return (
      <nav className=" text-lg">
        <ul className="flex gap-5 content-center h-full items-center">
          <li className="">
            <Link to='/Appointments' className="">Product</Link>
          </li>
          <li className="">
            <Link to='/Store' className="">Solution</Link>
          </li>
          <li className="">
            <Link to='/' className="">Open Source</Link>
          </li>
          <li className="">
            <Link to='/' className="">Pricing</Link>
          </li>
        </ul>
      </nav>
    );
  };


  return (
    <header className="header bg-[#161b22] text-white py-4 text-sm font-mono">
      <div className="flex items-center px-4">
        <div className="flex">
          <Link to='/' className="mr-4">
            <AiFillGithub size={40} />
          </Link>
        </div>
        <div className="flex-grow flex justify-between ">
          {links()}
          <div className="ml-4 flex justify-between">
            <div className=" flex border rounded-md mr-4 my-1 items-center ">
              <IoIosSearch size={28} className="px-1 cursor-pointer" />
              <input type="search" name="search_bar" id="" placeholder="Search or jump to" className="text-center bg-transparent focus:outline-none w-64" />
            </div>
            <Link to='/Login' className="mr-4 flex items-center">Sign in</Link>
            <Link to='/Signup' className="border rounded-md border-white px-2 py-1 flex items-center">Sign up</Link>
          </div>
        </div>
      </div>

      {/* <div className="icon">
        <Link to='/' className="">
          <AiFillGithub size={30}/>
        </Link>
      </div>
      <div className="ml-2 flex-1 flex justify-between">
        <nav className="navbar">
          <ul className="p-0 m-0 list-none">
            <li className=" inline-block"><a href="#">Home</a></li>
            <li className=" inline-block"><a href="#">About</a></li>
            <li className=" inline-block"><a href="#">Services</a></li>
            <li className=" inline-block"><a href="#">Contact</a></li>
          </ul>
        </nav>
        <div className="other-content">Other Content</div>
      </div> */}
    </header>
  );
};

export default Navbar;

import React from "react";
import Logo from "../assets/logo.png";
import Signupbutton from "./Signupbutton";
import { Link } from "react-router-dom";

function Navabar() {
  return (
    <div className="h-[63px] flex items-center border px-8 space-x-8">
      {/* Logo */}
      <img className="w-[50px]" src={Logo} alt="Logo" />

      {/* Title */}
      <h1 className="text-black text-2xl font-archivo mx-[11px]">
        Social Guardian
      </h1>

      {/* Navbar Links */}
      <div className="flex space-x-8 flex-grow">
        <Link className="hover:text-purple-700" to="/">
          Home
        </Link>
        <Link className="hover:text-purple-700" to="/addictiontest">
          Addiction Test
        </Link>
        <Link className="hover:text-purple-700" to="">
          Blogs
        </Link>
        <Link className="hover:text-purple-700" to="/Common">
          Community
        </Link>
        <Link className="hover:text-purple-700" to="">
          Wellness
        </Link>
        <Link className="hover:text-purple-700" to="">
          Features
        </Link>
      </div>

      {/* Sign Up Button (Aligned to the right) */}
      <div className="ml-auto">
        <Signupbutton />
      </div>
    </div>
  );
}

export default Navabar;

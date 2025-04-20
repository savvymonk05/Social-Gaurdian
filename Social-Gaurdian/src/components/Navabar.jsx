import React from "react";
import Logo from "../assets/logo.png";
import Loginbutton from "./Loginbutton";
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
        <Link className="hover:text-purple-700" to="/videocall">
          Video Conf....
        </Link>
        <Link className="hover:text-purple-700" to="/Common">
          Community
        </Link>
        <Link className="hover:text-purple-700" to="/emotion">
          Journaling
        </Link>
        <Link className="hover:text-purple-700" to="/dashboard">
          DashBoard
        </Link>
      </div>

      {/* Sign Up Button (Aligned to the right) */}
      <div className="ml-auto">
        <Loginbutton />
      </div>
    </div>
  );
}

export default Navabar;
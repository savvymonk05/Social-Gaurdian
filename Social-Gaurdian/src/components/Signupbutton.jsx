import React from "react";
import { Link } from "react-router-dom"; 

function Signupbutton() {
  return (
    <>
    <Link to="/signup">
      <button class="cursor-pointer bg-gradient-to-b from-indigo-500 to-indigo-600 shadow-[0px_4px_32px_0_rgba(99,102,241,.70)] px-4 py-2 rounded-xl border-[1px] border-slate-500 text-white font-medium group">
        <div class="relative overflow-hidden">
          <p class="group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
            Sign Up!
          </p>
          <p class="absolute top-7 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
            Click Me
          </p>
        </div>
      </button>
      </Link>
    </>
  );
}

export default Signupbutton;

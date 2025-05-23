import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'


const Loginpage = () => {
  const navigate = useNavigate();

  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    phone: "",
    // age:"",
  });

  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Sign Up

  const onChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  }

  const login = async () => {
    try {
      const userres = await fetch('/api/v1/user/login', {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!userres.ok) {
        throw new Error(`HTTP error! Status: ${userres.status}`);
      }

      const userData = await userres.json();
      console.log("Response from backend:", userData);

      if (userData) {
        localStorage.setItem("auth-token", JSON.stringify(userData.authToken));
        localStorage.setItem("name", userData.name)
        console.log("Stored Token:", localStorage.getItem("auth-token"));
        navigate('/dashboard');
      } else {
        alert("Login unsuccessful: No token received");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please try again.");
    }
  };



  const signup = async () => {
    // const { confirmPassword, ...userData } = formData;
    const userres = await fetch('/api/v1/user/createuser', {
      method: "POST",
      headers: {
        // Accept: "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    if (!userres.ok) {
      throw new Error(`HTTP error! Status: ${userres.status}`);
    }

    let userData = await userres.json();
    // console.log(userData);
    if (userData) {
      localStorage.setItem("auth-token", userData);
      navigate('/');
    }
    else {
      alert("unsuccessful");
    }
  }

  const handlesubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      login();
    } else {
      signup();
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="flex flex-col gap-3 bg-white p-8 rounded-2xl shadow-lg w-[450px] font-sans" onSubmit={handlesubmit}>
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          {isLogin ? 'Login' : 'Sign Up'}
        </h1>


        {/* Name section for signup page*/}
        {!isLogin && (
          <div className="flex flex-col">
            <label className="text-gray-800 font-semibold">Name</label>
            <input
              className="ml-2 w-full outline-none bg-transparent border border-gray-300 rounded-xl p-3 focus-within:border-blue-500"
              type="text"
              name="name"
              value={formData.name}
              onChange={onChange}
              placeholder="Enter your Name"
            />
          </div>
        )}


        {/* Email Input */}
        <div className="flex flex-col">
          <label className="text-gray-800 font-semibold">Email</label>
        </div>
        <div className="flex items-center border border-gray-300 rounded-xl p-3 transition-all duration-200 focus-within:border-blue-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            viewBox="0 0 32 32"
          >
            <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z" />
          </svg>
          <input
            className="ml-2 w-full outline-none bg-transparent"
            value={formData.email}
            onChange={onChange}
            type="email"
            name="email"
            placeholder="Enter your Email"
          />
        </div>

        {/* Password Input */}
        <div className="flex flex-col">
          <label className="text-gray-800 font-semibold">Password</label>
        </div>
        <div className="flex items-center border border-gray-300 rounded-xl p-3 transition-all duration-200 focus-within:border-blue-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            viewBox="-64 0 512 512"
          >
            <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" />
            <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" />
          </svg>
          <input
            className="ml-2 w-full outline-none bg-transparent"
            value={formData.password} onChange={onChange} name="password"
            type="password"
            placeholder="Enter your Password"
          />
        </div>

        {/* Gender section for signup */}
        {!isLogin && (
          <div className="flex flex-col">
            <label className="text-gray-800 font-semibold">Gender</label>
            <select
              className="ml-2 w-full outline-none bg-transparent border border-gray-300 rounded-xl p-3 focus-within:border-blue-500"
              name="gender"
              value={formData.gender || ""}
              onChange={onChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        )}

        {/* Phone number section for signup */}
        {!isLogin && (
          <div className="flex flex-col">
            <label className="text-gray-800 font-semibold">Phone Number</label>
            <input
              className="ml-2 w-full outline-none bg-transparent border border-gray-300 rounded-xl p-3 focus-within:border-blue-500"
              type="text"
              name="phone"
              value={formData.phone || ""}
              onChange={onChange}
              placeholder="Enter your Phone Number"
            />
          </div>
        )}

        {/* Confirm Password Input (Only for Sign Up) */}
        {/* {!isLogin && (
          <div className="flex flex-col">
            <label className="text-gray-800 font-semibold">Confirm Password</label>
            <div className="flex items-center border border-gray-300 rounded-xl p-3 transition-all duration-200 focus-within:border-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="-64 0 512 512"
              >
                <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" />
                <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" />
              </svg>
              <input
                className="ml-2 w-full outline-none bg-transparent"
                type="password"
                value={formData.password} onChange={onChange} name="password"
                placeholder="Confirm your Password"
              />
            </div>
          </div>
        )} */}

        {/* Remember Me and Forgot Password (Only for Login) */}
        {isLogin && (
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <input type="radio" />
              <label className="text-sm text-gray-800">Remember me</label>
            </div>
            <span className="text-sm text-blue-500 font-medium cursor-pointer">
              Forgot password?
            </span>
          </div>
        )}

        {/* Submit Button */}

        <button className="mt-5 bg-gray-800 text-white font-medium rounded-xl py-3 cursor-pointer hover:bg-gray-900 transition-all duration-200"
        //  onClick={isLogin? login:signup}
        >
          {isLogin ? 'Sign In' : 'Sign Up'}
        </button>

        {/* Toggle Between Login and Sign Up */}
        <p className="text-center text-sm text-gray-800">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 font-medium cursor-pointer"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </span>
        </p>

        {/* Divider */}
        <p className="text-center text-sm text-gray-800 my-2">Or With</p>

        {/* Google Button */}
        <button className="flex justify-center items-center gap-2 border border-gray-200 rounded-xl py-3 w-full hover:border-blue-500 transition-all duration-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            viewBox="0 0 512 512"
          >
            <path
              d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456C103.821,274.792,107.225,292.797,113.47,309.408z"
              fill="#FBBB00"
            />
            <path
              d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z"
              fill="#518EF8"
            />
            <path
              d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z"
              fill="#28B446"
            />
            <path
              d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0C318.115,0,375.068,22.126,419.404,58.936z"
              fill="#F14336"
            />
          </svg>
          Google
        </button>
      </form>
    </div>
  );
};
export default Loginpage;
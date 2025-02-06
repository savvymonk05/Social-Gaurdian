import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import Navabar from "./components/Navabar";
import Addictiontest from "./components/Addictiontest";
import Banner from "./components/Banner";
import Aboutus from "./components/Aboutus";
import  Signuppage from "./components/Signuppage";
import Common from "./components/Common";
import Features from "./components/Features";
import Footer  from "./components/Footer";



function App() {
  return (
    <>
      <BrowserRouter>
        <Navabar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner/>
                <Aboutus/>
                <Features/>
                <Footer />
              </>
            }
          />
        <Route path="/addictiontest" element={<Addictiontest />} />
        <Route path="/signup" element={<Signuppage />} />
        <Route path="/common" element={<Common/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

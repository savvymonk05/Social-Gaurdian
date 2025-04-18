import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import Navabar from "./components/Navabar";
import Addictiontest from "./components/Addictiontest";
import Banner from "./components/Banner";
import Aboutus from "./components/Aboutus";
import  Loginpage from "./components/Loginpage";
import Features from "./components/Features";
import Footer  from "./components/Footer";
import CommentSection from "./components/CommentSection";
import EmotionGraph from "./components/Emotiongraph";



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
        <Route path="/login" element={<Loginpage />} />
        <Route path="/common" element={<CommentSection/>} />
        <Route path="/emotion" element={<EmotionGraph/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

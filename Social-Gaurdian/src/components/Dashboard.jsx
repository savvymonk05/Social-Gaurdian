import React, { useState } from "react";
import EditPhotoButton from "./EditPhotoButton";
import defaultProfile from "../assets/profilephoto.jpg";
import { EnvelopeIcon, PhoneIcon, StarIcon } from "@heroicons/react/24/solid";
import { User } from "lucide-react";
import Chart from "./Chart";
import Footer from "./Footer";
import DownloadButton from "./DownloadButton";

const Dashboard = () => {
  // Mock user data for UI display
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    gender: "Male",
    phone: "+1 (555) 123-4567",
  });
  
  const [profilePhoto, setProfilePhoto] = useState(defaultProfile);
  const [status, setStatus] = useState("Pending Test");

  const handlePhotoUpdate = (newPhotoUrl) => {
    setProfilePhoto(newPhotoUrl);
  };

  return (
    <div className="relative pt-8">
      <div className="w-full min-h-[480px] bg-white rounded-md shadow-sm">
        <div className="relative h-[480px]">
          <div className="absolute top-[28px] left-[56px] w-[303px]">
            <div className="relative w-full h-[330px] rounded-md border-2 border-black overflow-hidden">
              <img
                src={profilePhoto}
                alt={`${userData.name}'s Profile`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = defaultProfile;
                }}
              />
            </div>
            <div className="mt-[42px] flex justify-center">
              <EditPhotoButton 
                onPhotoUpdate={handlePhotoUpdate}
                userId="mock-user-id"
              />
            </div>
          </div>

          <div className="absolute top-[8px] left-[436px] pr-[100px]">
            <h1 className="font-archivo text-[54px] leading-[76px] font-bold text-neutral-900 whitespace-nowrap overflow-x-auto">
              {userData.name}
            </h1>

            <div className="flex items-center mt-[23px]">
              <EnvelopeIcon className="w-[48px] h-[48px] text-[#636AE8]" />
              <p className="font-inter text-[32px] leading-[48px] text-neutral-900 ml-[20px]">
                {userData.email}
              </p>
            </div>

            <div className="flex items-center mt-[19px]">
              <div className="w-[48px] h-[48px] p-2">
                <User className="w-full h-full text-[#636AE8]" />
              </div>
              <p className="font-inter text-[32px] leading-[48px] text-neutral-900 ml-[20px]">
                {userData.gender}
              </p>
            </div>

            <div className="flex items-center mt-[19px]">
              <PhoneIcon className="w-[48px] h-[48px] text-[#636AE8]" />
              <p className="font-inter text-[32px] leading-[48px] text-neutral-900 ml-[12px]">
                {userData.phone}
              </p>
            </div>

            <div className="flex items-center mt-[19px]">
              <StarIcon className="w-[40px] h-[40px] text-[#636AE8]" />
              <p className="font-inter text-[32px] leading-[48px] text-neutral-900 ml-[20px]">
                {status}
              </p>
            </div>
          </div>
        </div>
        <div className="absolute top-[52px] left-[1236px]">
          <DownloadButton />
        </div>
      </div>
      
      <div className="w-full mt-6 bg-white rounded-md shadow-sm">
        <div className="p-6">
          <Chart />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
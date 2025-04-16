import React from 'react';
import Dash from '../assets/aboutus-dash.svg';
import Women from '../assets/aboutus-women.png'

function AboutUs() {
  return (
    <div className="h-auto w-full py-16 px-8 flex items-start gap-x-20"> {/* Increased gap here */}
      {/* Left container for H1, H3, and paragraph */}
      <div className="ml-[110px] flex flex-col gap-y-4">
        <h3 className=' font-Archivo top-[20px] relative left-[20px]'>Dolore dolore voluptate aliqua ut mi</h3>
        <h2 className="text-7xl font-Archivo font-bold">About Us</h2>
        <img src={Dash} alt="About Us Illustration" className="w-[320px] h-[70px] relative top-[-20px]" />

        {/* Paragraph */}
        <p className="w-[540px] font-inter relative top-[-20px] text-[25px] leading-[30px] font-normal text-[#323842FF]">
          Labore proident nisi fugiat nostrud sint mollit aliqua ipsum ad veniam cupidatat ullamco ullamco et.
          Aliqua tempor do consectetur reprehenderit Lorem aliqua commodo occaecat deserunt. Do eiusmod incididunt.
        </p>
      </div>

      <div className='relative top-[5px] left-[200px] w-[469px] h-[499px] bg-[#FDF1F5] rounded-t-[235px] rounded-r-[235px] rounded-b-none rounded-l-none'>
      <img src={Women} alt="About Us Illustration" className="w-[400px] h-[400]" />
      </div>
      
      </div>
    
  );
}

export default AboutUs;

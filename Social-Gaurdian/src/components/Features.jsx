import React from "react";
import Feature1 from "../assets/feature1.svg";
import Feature2 from "../assets/feauture2.svg";
import Feature3 from "../assets/feature3.svg";
import Feature4 from "../assets/feature4.svg";

function Features() {
  return (
    <div className="h-auto w-full flex flex-col items-center justify-center py-20">
      <h1 className="text-center text-6xl font-Archivo font-bold mb-10">
        Features
      </h1>

      <div className="flex flex-wrap justify-center gap-5">
        {/* First Feature */}
        <div className="w-[384px] h-[320px] bg-[#BAF3EB] rounded-[20px] relative p-8">
          <h2 className="text-4xl leading-[48px] font-bold text-[#323842] mb-4">
            Feature 1
          </h2>
          <p className="text-base leading-[30px] font-Inter text-[#323842] mb-4">
            Labore proident nisi fugiat nostrud sint mollit aliqua ipsum ad veniam cupidatat.
          </p>
          <img
            className="absolute bottom-0 right-0 w-[162px] h-[180px] rounded-none"
            src={Feature1}
            alt="Feature 1"
          />
        </div>

        {/* Second Feature */}
        <div className="w-[768px] h-[320px] bg-[#CED0F8] rounded-[20px] relative p-8">
          <h2 className="text-4xl leading-[48px] font-bold text-[#323842] mb-4">
            Feature 2
          </h2>
          <p className="text-base leading-[30px] font-Inter text-[#323842] mb-4">
            Labore proident nisi fugiat nostrud sint mollit aliqua ipsum ad veniam cupidatat ullamco ulla Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde, voluptates rem itaque dicta reprehenderit pariatur quia perspiciatis aliquam.
          </p>
          <img
            className="absolute bottom-0 right-0 w-[240px] h-[180px] rounded-none"
            src={Feature2}
            alt="Feature 2"
          />
        </div>

        {/* Third Feature */}
        <div className="w-[768px] h-[320px] bg-[#F8DBD0] rounded-[20px] relative p-8">
          <h2 className="text-4xl leading-[48px] font-bold text-[#323842] mb-4">
            Feature 3
          </h2>
          <p className="text-base leading-[30px] font-Inter text-[#323842] mb-4">
            Labore proident nisi fugiat nostrud sint mollit aliqua ipsum ad veniam cupidatat ullamco ulla Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde, voluptates rem itaque dicta reprehenderit pariatur quia perspiciatis aliquam.
          </p>
          <img
            className="absolute bottom-0 right-0 w-[240px] h-[160px] rounded-none"
            src={Feature3}
            alt="Feature 3"
          />
        </div>

        {/* Fourth Feature */}
        <div className="w-[384px] h-[320px] bg-[#FDF1F5] rounded-[20px] relative p-8">
          <h2 className="text-4xl leading-[48px] font-bold text-[#323842] mb-4">
            Feature 4
          </h2>
          <p className="text-base leading-[30px] font-Inter text-[#323842] mb-4">
            Labore proident nisi fugiat nostrud sint mollit aliqua ipsum ad veniam cupidatat ullamco ulla Lorem ipsum do
          </p>
          <img
            className="absolute bottom-0 right-0 w-[240px] h-[160px] rounded-none"
            src={Feature4}
            alt="Feature 4"
          />
        </div>
      </div>
    </div>
  );
}

export default Features;

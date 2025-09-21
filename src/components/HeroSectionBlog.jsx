    import React from "react";

    export default function HeroSectionBlog() {
        return(
           <section className="bg-blue-50 py-12 px-6 md:px-20 flex flex-col md:flex-row items-center rounded-lg shadow-lg">
      
      {/* Left Text Section */}
      <div className="md:w-1/2 mb-10 md:mb-0">
        <h5 className="text-sm text-gray-500 mb-2">
          By Themadbrains in <span className="text-teal-500">inspiration</span>
        </h5>
        <h1 className="text-2xl md:text-4xl font-bold text-blue-900 mb-4 leading-tight">
          Why Swift UI Should Be on the Radar of Every Mobile Developer
        </h1>
        <p className="text-gray-600 mb-6 max-w-md">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempos Lorem ipsum dolor sitamet, consectetur adipiscing elit, sed do eiusmod tempor
        </p>
        <button className="bg-teal-500 text-white font-semibold py-2 px-6 rounded-md hover:bg-teal-600 transition">
          Start learning now
        </button>
      </div>
      
      {/* Right Image Section */}
      <div className="md:w-1/2">
        <img
          src="relatedDetails2.png"
          alt="Online meeting on laptop"
          className="rounded-lg shadow-lg object-cover w-full h-auto"
        />
      </div>
      
    </section>
  );
        
    }

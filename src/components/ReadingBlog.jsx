import React from "react";
import InfoCard from "./InfoCard";



export default function ReadingBlog() {
    return(
         <div className="max-w-6xl mx-auto px-4 py-8">
            <h3 className="text-lg font-semibold font-semibold mb-6">Reading blog list</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        
        {/* Card1*/}
         <div className="relative w-full h-40 rounded-lg overflow-hidden shadow-md">
          <img
            src="reading1.png"
            alt="UI/UX"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/410" />
          <button
            className="absolute bottom-3 left-1/2 transform -translate-x-1/2
                        bg-white bg-white/65 text-gray-800 
                        px-11 py-1 rounded-md font-semibold text-base shadow
                        hover:bg-opacity-90 hover:scale-105 transition-all"
            >
            UX/UI
            </button>

        </div>

        {/* بطاقة 2 */}
        <div className="relative w-full h-40 rounded-xl overflow-hidden shadow-md">
          <img
            src="reading2.jpg"
            alt="React"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/410" />
          <div className="absolute inset-0 flex justify-center items-center">
            <button
            className="absolute bottom-3 left-1/2 transform -translate-x-1/2
                        bg-white bg-white/65 text-gray-800 
                        px-11 py-1 rounded-md font-semibold text-base shadow
                        hover:bg-opacity-90 hover:scale-105 transition-all"
            >
            React
            </button>
          </div>
        </div>

        {/* بطاقة 3 */}
        <div className="relative w-full h-40 rounded-xl overflow-hidden shadow-md">
          <img
            src="reading3.jpg"
            alt="PHP"
            className="w-full h-full object-cover "
          />
          <div className="absolute inset-0 bg-black/410" />
          <div className="absolute inset-0 flex justify-center items-center">
            <button
            className="absolute bottom-3 left-1/2 transform -translate-x-1/2
                        bg-white bg-white/65 text-gray-800 
                        px-11 py-1 rounded-md font-semibold text-base shadow
                        hover:bg-opacity-90 hover:scale-105 transition-all"
            >
            PHP
            </button>
          </div>
        </div>

        {/* بطاقة 4 */}
        <div className="relative w-full h-40 rounded-xl overflow-hidden shadow-md">
          <img
            src="reading4.png"
            alt="JavaScript"
            className="w-full h-full object-cover brightness-110"
          />
          <div className="absolute inset-0 bg-black/410" />
          <div className="absolute inset-0 flex justify-center items-center">
            <button
            className="absolute bottom-3 left-1/2 transform -translate-x-1/2
                        bg-white bg-white/65 text-gray-800 
                        px-12 py-1 rounded-md font-semibold text-base shadow
                        hover:bg-opacity-90 hover:scale-105 transition-all"
            >
            JS
            </button>
          </div>
        </div>
      </div>
  </div>

  );
}

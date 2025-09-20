    import React from "react";

    export default function PhysicalClassRoom() {
        return(
           <section className="bg-blue-50 py-12 px-6 md:px-20 flex flex-col md:flex-row items-center rounded-lg shadow-lg">
      
      {/* Left Text Section */}
      <div className="md:w-1/2 mb-10 md:mb-0">
  {/* شلنا mx-12 و خلينا حجم الخط 4xl زي الصورة */}
    <h1 className="text-3xl text-blue-900 font-semibold mx-12">
        Everything you can do in a physical classroom, <span className="text-teal-500">you can do with TOTC</span>
    </h1>
    <br />
      <p className="text-gray-500 leading-relaxed mx-12">
        TOTC’s school management software helps traditional and online schools manage scheduling, attendance, payments and virtual classrooms all in one secure cloud-based system.
    </p>
      <br />
            <a href="#" className="text-gray-500 underline text-sm mx-12">Learn more</a>
      </div>
      
      {/* Right Image Section */}
      <div className="md:w-1/2">
        <img
          src="/physicalClassRoom.jpg"
          alt="Online meeting on laptop"
          className="rounded-lg shadow-lg object-cover w-full h-auto"
        />
      </div>
      
    </section>
  );
        
    }

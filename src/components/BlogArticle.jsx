import React from 'react';

function BlogArticle() {
  return (
    <div className="max-w-4xl mx-auto px-4">
      
     
      
      <div className="mt-8">
      </div>

      <div className="flex justify-between items-center my-8">
        {/* الأزرار Tags */}
        <div className="flex flex-wrap space-x-2">
          <button className="bg-teal-50 text-gray-800 py-1 px-4 rounded-full text-sm">
            affordable
          </button>
          <button className="bg-teal-50 text-gray-800 py-1 px-4 rounded-full text-sm">
            Stunning
          </button>
          <button className="bg-teal-50 text-gray-800 py-1 px-4 rounded-full text-sm">
            making
          </button>
          <button className="bg-teal-50 text-gray-800 py-1 px-4 rounded-full text-sm">
            maddrawns
          </button>
        </div>
      </div>

      <div className="border-t border-gray-300 mb-4"></div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          <img 
            src="src\pages\images\2f32d3a9082c2e2832481561feec93a5e5c5e8d6.png" 
            alt="Lina" 
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <p className="text-gray-600">Written by</p>
            <p className="font-semibold text-black">Lina</p>
          </div>
        </div>

        <button className="bg-white text-teal-500 border border-teal-500 font-semibold py-2 px-10 rounded-md transition hover:bg-gray-100">
          Follow
        </button>
      </div>

    </div>
  );
}

export default BlogArticle;
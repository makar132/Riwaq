import React from 'react';
import CourseRatingSection from './CourseRatingSection';
import RightSideDetails from './RightSideDetails';

const CombainDetails = () => {
  return (
    // أضفت overflow-x-hidden عشان أي عنصر خارج العرض ما يعملش scroll
    <div className="container mx-auto px-4 py-8 overflow-x-hidden">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* الريفيوهات */}
        <div className="flex-1">
          <CourseRatingSection />
        </div>

        {/* الكارت */}
        <div className="w-full lg:w-[350px]">
          <RightSideDetails />
        </div>
      </div>
    </div>
  );
};

export default CombainDetails;

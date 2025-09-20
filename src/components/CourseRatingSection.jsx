import React from 'react';

const CourseRatingSection = () => {
  return (
    // شلت mx-20 عشان ما يزقش المحتوى برا الشاشة في الموبايل
    <div className="w-full bg-blue-50 rounded-lg p-4 space-y-4">
      {/* التقييم العام */}
      <div className="text-center">
        <div className="text-2xl font-semibold text-gray-800">4 out of 5</div>
        <div className="text-yellow-400 text-lg">⭐⭐⭐⭐☆</div>
        <div className="text-sm text-gray-600 mt-1">Top Rating</div>
      </div>

      {/* الأعمدة */}
      <div className="space-y-1">
        {[
          { label: '5 Stars', percent: '80%' },
          { label: '4 Stars', percent: '60%' },
          { label: '3 Stars', percent: '50%' },
          { label: '2 Stars', percent: '30%' },
          { label: '1 Stars', percent: '20%' },
        ].map((item, idx) => (
          <div key={idx} className="flex items-center space-x-2 text-sm text-gray-700">
            <span className="w-16">{item.label}</span>
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="bg-teal-500 h-2 rounded-full"
                style={{ width: item.percent }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* تعليقات المستخدمين */}
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="flex items-start space-x-3 border-t pt-3">
            <img
              src="/details.png"
              alt="user"
              className="w-10 h-10 max-w-full rounded-full object-cover"
            />
            <div>
              <div className="font-semibold text-gray-800 flex items-center">
                Lina
                <span className="ml-2 text-yellow-400 text-sm">⭐⭐⭐⭐⭐</span>
              </div>
              <p className="text-sm text-gray-600">
                Class, launched less than a year ago by Blackboard co-founder Michael Chasen,
                integrates exclusively...
              </p>
              <div className="text-xs text-gray-400 mt-1">3 Month</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseRatingSection;

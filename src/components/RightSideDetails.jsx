import React from 'react';

const RightSideDetails = () => {
  return (
    <div className="w-full bg-white rounded-lg mx-auto shadow-md p-4 space-y-4 lg:sticky lg:top-6">
      {/* الصورة الأساسية */}
      <img
        src="/blogDetails.jpg"
        alt="Course"
        className="w-full max-w-full h-48 object-cover rounded-md"
      />

      {/* السعر */}
      <div>
        <div className="text-2xl text-center font-bold text-gray-800">$49.65</div>
        <div className="text-sm text-center text-gray-500 line-through">$99.99</div>
        <div className="text-sm text-center text-green-500 font-semibold">50% Off</div>
        <div className="text-xs text-center text-red-500 mt-1">
          11 hour left at this price
        </div>
      </div>

      {/* زرار الشراء */}
      <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-md font-semibold transition duration-200">
        Buy Now
      </button>

      <hr className="border-t border-gray-500" />

      {/* تفاصيل الكورس */}
      <div>
        <h3 className="font-semibold mb-2">This Course included</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>✅ Money Back Guarantee</li>
          <li>💻 Access on all devices</li>
          <li>📜 Certification of completion</li>
          <li>📚 32 Modules</li>
        </ul>
      </div>

      <hr className="border-t border-gray-500" />

      {/* جزء التدريب */}
      <div>
        <h3 className="font-semibold mb-1">Training 5 or more people</h3>
        <p className="text-sm text-gray-600">
          Class, launched less than a year ago by Blackboard co-founder Michael
          Chasen, integrates exclusively...
        </p>
      </div>

      <hr className="border-t border-gray-500" />
    </div>
  );
};

export default RightSideDetails;

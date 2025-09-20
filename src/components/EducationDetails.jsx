import React from 'react';

const Card = ({ discount, title, description, imageSrc }) => {
  return (
    <div className="relative overflow-hidden rounded-xl shadow-lg m-4 w-full md:w-1/3">
      <div className="absolute top-0 left-0 bg-red-500 text-white text-sm font-semibold px-2 py-1 m-4 rounded-md">
        {discount}
      </div>
      <img src={imageSrc} alt={title} className="w-full h-auto object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
};

const EducationDetails = () => {
  const cardData = [
    {
      discount: "50%",
      title: "FOR INSTRUCTORS",
      description: "TOTC's school management software helps traditional and online schools manage scheduling.",
      imageSrc: "/relatedDetails1.png", // Use your actual image URL here
    },
    {
      discount: "50%",
      title: "FOR INSTRUCTORS",
      description: "TOTC's school management software helps traditional and online schools manage scheduling.",
      imageSrc: "/relatedDetails1.png",
    },
    {
      discount: "50%",
      title: "FOR INSTRUCTORS",
      description: "TOTC's school management software helps traditional and online schools manage scheduling.",
      imageSrc: "/relatedDetails1.png",
    },
  ];

  return (
    <div className="bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Top Education offers and deals are listed here</h2>
        <a href="#" className="text-teal-600 font-semibold">See all</a>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center">
        {cardData.map((card, index) => (
          <Card 
            key={index} 
            discount={card.discount}
            title={card.title}
            description={card.description}
            imageSrc={card.imageSrc}
          />
        ))}
      </div>
    </div>
  );
};

export default EducationDetails;
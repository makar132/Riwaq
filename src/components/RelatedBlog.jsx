import React from 'react';

// الجزء الأول: Component الكارد الواحد البسيط
const SimpleBlogCard = ({ image, title, authorName, views, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
        <div className="mx-4 mt-8 ">
            <img src={image} alt={title} className="w-full h-65 object-cover rounded-2xl" />
        </div>
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <div className="flex items-center mb-4">
          <img src={image} alt={authorName} className="w-8 h-8 rounded-full mr-2" />
          <h4 className="text-sm font-semibold">{authorName}</h4>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{description}</p>
        <div className="flex items-center justify-between mt-auto">
          <a href="#" className="text-black-500 underline text-sm">Read more</a>
          <div className="flex items-center text-gray-400 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="teal">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>{views}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ---

// الجزء الثاني: Component الصفحة الرئيسية اللي بيستخدم SimpleBlogCard
const RelatedBlog = () => {
  const cardData = [
    {
      id: 1,
      image: '/relatedDetails1.png',
      title: 'Class adds $30 million to its balance sheet for a Zoom-friendly edtech solution',
      authorPic: 'https://randomuser.me/api/portraits/women/44.jpg',
      authorName: 'Lina',
      description: 'Class, launched less than a year ago by Blackboard co-founder Michael Chasen, integrates exclusively with Zoom to provide enhanced classroom management, analytics, and student engagement tools...',
      views: '251,232',
    },
    {
      id: 2,
      image: '/relatedDetails2.png',
      title: 'Class adds $30 million to its balance sheet for a Zoom-friendly edtech solution',
      authorPic: 'https://randomuser.me/api/portraits/women/44.jpg',
      authorName: 'Lina',
      description: 'Class, launched less than a year ago by Blackboard co-founder Michael Chasen, integrates exclusively with Zoom to provide enhanced classroom management, analytics, and student engagement tools...',
      views: '251,232',
    },
  ];

  return (
    <div className="bg-blue-50 py-12 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Related Blog</h1>
          <a href="#" className="text-teal-500 font-semibold hover:underline">See all</a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cardData.map(card => (
            <SimpleBlogCard
              key={card.id}
              image={card.image}
              title={card.title}
              authorPic={card.authorPic}
              authorName={card.authorName}
              description={card.description}
              views={card.views}
            />
          ))}
        </div>
        <div className="flex justify-end mt-8 space-x-2">
          <button className="w-10 h-10 rounded-2xl bg-teal-100 text-gray-600 flex items-center justify-center hover:bg-teal-400">
            &lt;
          </button>
          <button className="w-10 h-10 rounded-2xl bg-teal-500 text-white flex items-center justify-center hover:bg-teal-700">
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default RelatedBlog;

//import React from 'react';

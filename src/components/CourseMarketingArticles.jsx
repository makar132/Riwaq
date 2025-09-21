import React from 'react';

//
const BlogCard = ({ image, title, authorPic, authorName, description, views, price, newPrice, category, time, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col p-4">
      {/* pic*/}
      <img src={image} alt={title} className="w-full h-48 object-cover rounded-lg mb-4" />
      
      {/*  time  */}
     <div className="flex items-center text-sm font-semibold text-gray-700 space-x-20 mb-2">
  {category && (
    <div className="flex items-center space-x-1">
      {icon && <span className="text-gray-500">{icon}</span>}
      <span>{category}</span>
    </div>
  )}
  {time && (
    <div className="flex items-center space-x-1">
      <span className="text-gray-500">🕒</span>
      <span>{time}</span>
    </div>
  )}
</div>

      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        
        {/* p */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{description}</p>
        
        <div className="flex items-center justify-between mt-auto">
          {/* auther info and price  */}
          <div className="flex items-center">
            <img src={authorPic} alt={authorName} className="w-8 h-8 rounded-full mr-2" />
            <h4 className="text-sm font-semibold">{authorName}</h4>
          </div>
          {views && (
            <div className="flex items-center text-gray-400 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>{views}</span>
            </div>
          )}
          {price && newPrice && (
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-gray-400 line-through">${price}</span>
              <span className="text-teal-500 font-bold">${newPrice}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// main component
const CourseMarketingArticles = () => {
  const cardData = [
    {
      id: 1,
      image: 'marketArticle.png',
      title: 'AWS Certified solutions Architect',
      authorPic: 'https://randomuser.me/api/portraits/women/44.jpg',
      authorName: 'Lina',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempos Lorem ipsum dolor sitamet, consectetur adipiscing elit, sed do eiusmod tempor',
      price: '100',
      newPrice: '80',
      category: 'Design',
      time: '3 Month',
      icon: '📐',
    },
    {
      id: 2,
      image: 'marketArticle2.png',
      title: 'AWS Certified solutions Architect',
      authorPic: 'https://randomuser.me/api/portraits/women/44.jpg',
      authorName: 'Lina',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempos Lorem ipsum dolor sitamet, consectetur adipiscing elit, sed do eiusmod tempor',
      price: '100',
      newPrice: '80',
      category: 'Design',
      time: '3 Month',
      icon: '📐',
    },
    {
      id: 3,
      image: 'marketArticle3.jpg',
      title: 'AWS Certified solutions Architect',
      authorPic: 'https://randomuser.me/api/portraits/women/44.jpg',
      authorName: 'Lina',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempos Lorem ipsum dolor sitamet, consectetur adipiscing elit, sed do eiusmod tempor',
      price: '100',
      newPrice: '80',
      category: 'Design',
      time: '3 Month',
      icon: '📐',
    },
    {
      id: 4,
      image: 'marketArticle4.png',
      title: 'AWS Certified solutions Architect',
      authorPic: 'https://randomuser.me/api/portraits/women/44.jpg',
      authorName: 'Lina',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempos Lorem ipsum dolor sitamet, consectetur adipiscing elit, sed do eiusmod tempor',
      price: '100',
      newPrice: '80',
      category: 'Design',
      time: '3 Month',
      icon: '📐',
    },
  ];

  return (
    <div className=" mt-[3em] bg-blue-100 py-12 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Marketing Articles</h1>
          <a href="#" className="text-teal-500 font-bold hover:underline">See all</a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cardData.map(card => (
            <BlogCard
              key={card.id}
              {...card}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseMarketingArticles;
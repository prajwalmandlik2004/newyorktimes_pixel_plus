import React from 'react';
import { Link } from 'react-router-dom';
import { useNews } from '../../context/NewsContext';

const Navigation = () => {
  const { categories, currentCategory } = useNews();
  
  return (
    <nav className="hidden md:block border-y border-gray-200">
      <div className="nyt-container overflow-x-auto">
        <div className="flex space-x-5 py-2 whitespace-nowrap">
          {categories.map((category) => (
            <Link
              key={category}
              to={category === 'home' ? '/' : `/section/${category}`}
              className={`text-sm font-medium hover:text-gray-900 transition-colors capitalize ${
                currentCategory === category ? 'text-black font-semibold' : 'text-gray-500'
              }`}
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
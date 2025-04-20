import React from 'react';
import { Menu } from 'lucide-react';

const TopBar = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="nyt-container">
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center md:hidden">
            <button className="p-2" aria-label="Menu">
              <Menu size={20} />
            </button>
          </div>
          
          <div className="text-xs text-gray-500 hidden md:block">
            {currentDate}
          </div>
          
          <nav className="hidden md:flex space-x-5 text-xs font-medium">
            <a href="https://www.nytimes.com/section/todayspaper" className="nyt-link">Today's Paper</a>
            <a href="https://www.nytimes.com/section/podcasts" className="nyt-link">Podcasts</a>
            <a href="https://games.nytimes.com/" className="nyt-link">Games</a>
            <a href="https://cooking.nytimes.com/" className="nyt-link">Cooking</a>
          </nav>
          
          <div className="text-xs text-center md:text-right">
            <a href="/sentiment-map" className="nyt-link">
              <span className="font-bold">New:</span> Global Sentiment Map
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
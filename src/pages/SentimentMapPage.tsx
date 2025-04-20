import React, { useState } from 'react';
import { useNews } from '../context/NewsContext';
import WorldMap from '../components/SentimentMap/WorldMap';
import SentimentDisplay from '../components/SentimentMap/SentimentDisplay';

const SentimentMapPage = () => {
  const { sentimentData, selectedSentimentCategory, setSelectedSentimentCategory } = useNews();
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  
  const sentimentCategories = ["Politics", "Climate", "Tech", "Economy"];
  
  const handleCountrySelect = (countryCode: string) => {
    setSelectedCountry(countryCode);
  };
  
  const selectedCountryData = selectedCountry 
    ? sentimentData.find(country => country.countryCode === selectedCountry)
    : null;
  
  return (
    <div className="nyt-container py-8">
      <h1 className="headline-xl mb-4">Global News Sentiment Map</h1>
      <p className="text-xl mb-8">
        Explore how news sentiment varies across different regions and topics.
      </p>
      
      <div className="mb-6">
        <div className="flex flex-wrap gap-3">
          {sentimentCategories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedSentimentCategory(category)}
              className={`px-4 py-2 rounded-full text-sm ${
                selectedSentimentCategory === category 
                  ? 'bg-black text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-gray-100 p-4 rounded-md">
          <WorldMap 
            sentimentData={sentimentData} 
            selectedCategory={selectedSentimentCategory}
            onSelectCountry={handleCountrySelect}
          />
          <div className="flex justify-center gap-8 mt-4">
            <div className="flex items-center">
              <span className="w-4 h-4 inline-block bg-green-500 mr-2 rounded-full"></span>
              <span className="text-sm">Positive</span>
            </div>
            <div className="flex items-center">
              <span className="w-4 h-4 inline-block bg-gray-400 mr-2 rounded-full"></span>
              <span className="text-sm">Neutral</span>
            </div>
            <div className="flex items-center">
              <span className="w-4 h-4 inline-block bg-red-500 mr-2 rounded-full"></span>
              <span className="text-sm">Negative</span>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-4">
          <SentimentDisplay 
            countryData={selectedCountryData} 
            category={selectedSentimentCategory}
          />
          
          <div className="mt-8 bg-gray-100 p-4 rounded-md">
            <h3 className="headline-sm mb-3">About This Feature</h3>
            <p className="text-sm mb-4">
              This interactive map displays news sentiment analysis based on headlines from various countries.
              Select a country to view specific headlines and their sentiment analysis.
            </p>
            <p className="text-sm">
              The sentiment data is updated daily based on analysis of thousands of news sources.
              Colors indicate positive (green), neutral (gray), or negative (red) sentiment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentimentMapPage;
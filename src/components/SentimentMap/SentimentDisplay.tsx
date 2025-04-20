import React from 'react';
import { SentimentData } from '../../context/NewsContext';

type SentimentDisplayProps = {
  countryData: SentimentData | null;
  category: string;
};

const SentimentDisplay = ({ countryData, category }: SentimentDisplayProps) => {
  if (!countryData) {
    return (
      <div className="bg-gray-100 p-4 rounded-md">
        <h3 className="headline-sm mb-4">Country Information</h3>
        <p className="text-gray-500">
          Select a country on the map to view news sentiment data and headlines.
        </p>
      </div>
    );
  }
  
  const sentiment = countryData.sentiment[category];
  const headlines = countryData.headlines[category] || [];
  
  const sentimentColor = {
    "positive": "bg-green-500",
    "neutral": "bg-gray-400",
    "negative": "bg-red-500"
  }[sentiment];
  
  const sentimentText = {
    "positive": "Positive",
    "neutral": "Neutral",
    "negative": "Negative"
  }[sentiment];
  
  return (
    <div className="bg-gray-100 p-4 rounded-md">
      <h3 className="headline-sm mb-2">{countryData.country}</h3>
      
      <div className="flex items-center mb-4">
        <div className={`w-4 h-4 rounded-full ${sentimentColor} mr-2`}></div>
        <span className="font-medium">{category} Sentiment: {sentimentText}</span>
      </div>
      
      <h4 className="font-bold text-sm mb-3">Recent Headlines:</h4>
      
      <ul className="space-y-3">
        {headlines.map((headline, index) => (
          <li key={index} className="text-sm border-l-2 pl-3 border-gray-300">
            {headline}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SentimentDisplay;
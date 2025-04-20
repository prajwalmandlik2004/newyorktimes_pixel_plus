import React, { useState } from 'react';
import { 
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import { SentimentData } from '../../context/NewsContext';

type WorldMapProps = {
  sentimentData: SentimentData[];
  selectedCategory: string;
  onSelectCountry: (countryCode: string) => void;
};

const WorldMap = ({ sentimentData, selectedCategory, onSelectCountry }: WorldMapProps) => {
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  
  const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";
  
  const handleMouseEnter = (geo: any) => {
    const countryCode = geo.properties.id;
    const country = sentimentData.find(item => item.countryCode === countryCode);
    
    if (country) {
      setTooltipContent(country.country);
      setShowTooltip(true);
    }
  };
  
  const handleMouseLeave = () => {
    setTooltipContent("");
    setShowTooltip(false);
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    setTooltipPosition({ x: e.clientX, y: e.clientY });
  };
  
  const getCountryColor = (countryCode: string) => {
    const country = sentimentData.find(item => item.countryCode === countryCode);
    
    if (!country) return "#F5F5F5";
    
    const sentiment = country.sentiment[selectedCategory];
    
    switch (sentiment) {
      case "positive":
        return "#22C55E"; // Green
      case "neutral":
        return "#9CA3AF"; // Gray
      case "negative":
        return "#EF4444"; // Red
      default:
        return "#F5F5F5"; // Light gray for countries with no data
    }
  };
  
  return (
    <div className="relative">
      <ComposableMap projection="geoMercator" projectionConfig={{ scale: 120 }}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const countryCode = geo.properties.id;
              
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => handleMouseEnter(geo)}
                  onMouseLeave={handleMouseLeave}
                  onMouseMove={handleMouseMove}
                  onClick={() => onSelectCountry(countryCode)}
                  style={{
                    default: {
                      fill: getCountryColor(countryCode),
                      stroke: "#FFF",
                      strokeWidth: 0.5,
                      outline: "none",
                    },
                    hover: {
                      fill: getCountryColor(countryCode),
                      stroke: "#000",
                      strokeWidth: 1,
                      outline: "none",
                      cursor: "pointer"
                    },
                    pressed: {
                      fill: getCountryColor(countryCode),
                      stroke: "#000",
                      strokeWidth: 1,
                      outline: "none",
                    }
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      
      {showTooltip && (
        <div 
          className="absolute bg-white shadow-md p-2 rounded text-sm z-10 pointer-events-none"
          style={{ 
            left: tooltipPosition.x + 10, 
            top: tooltipPosition.y - 80,
            transform: 'translateX(-50%)'
          }}
        >
          {tooltipContent}
        </div>
      )}
    </div>
  );
};

export default WorldMap;
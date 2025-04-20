import React from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();
  
  const footerSections = [
    {
      title: "News",
      links: [
        { text: "Home Page", url: "/" },
        { text: "World", url: "/section/world" },
        { text: "U.S.", url: "/section/u.s." },
        { text: "Politics", url: "/section/politics" },
        { text: "New York", url: "/section/n.y." },
        { text: "Business", url: "/section/business" },
        { text: "Tech", url: "/section/tech" },
        { text: "Science", url: "/section/science" },
      ]
    },
    {
      title: "Opinion",
      links: [
        { text: "Today's Opinion", url: "/section/opinion" },
        { text: "Op-Ed Contributors", url: "#" },
        { text: "Editorials", url: "#" },
        { text: "Letters", url: "#" },
        { text: "Sunday Review", url: "#" },
      ]
    },
    {
      title: "Arts",
      links: [
        { text: "Today's Arts", url: "/section/arts" },
        { text: "Art & Design", url: "#" },
        { text: "Books", url: "/section/books" },
        { text: "Movies", url: "#" },
        { text: "Music", url: "#" },
        { text: "Television", url: "#" },
        { text: "Theater", url: "#" },
      ]
    },
    {
      title: "Living",
      links: [
        { text: "Automotive", url: "#" },
        { text: "Games", url: "#" },
        { text: "Education", url: "#" },
        { text: "Food", url: "/section/food" },
        { text: "Health", url: "/section/health" },
        { text: "Jobs", url: "#" },
        { text: "Style", url: "/section/style" },
        { text: "Travel", url: "/section/travel" },
      ]
    },
  ];
  
  return (
    <footer className="mt-12 bg-gray-100 pt-8 pb-12">
      <div className="nyt-container">
        <div className="flex flex-col md:flex-row justify-between mb-8">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="inline-block">
              <h2 className="text-2xl font-serif font-bold tracking-tight">
                The New York Times
              </h2>
            </Link>
          </div>
          
          <div className="w-full md:w-auto">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <Link to="/sentiment-map" className="text-sm hover:underline">
                Sentiment Map
              </Link>
              
              <a href="#" className="text-sm hover:underline">
                About
              </a>
              
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email address"
                  className="pl-3 pr-10 py-2 border border-gray-300 rounded text-sm w-full md:w-64"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <Mail size={18} />
                </button>
              </div>
              
              <button className="nyt-button text-sm">
                Subscribe to Newsletter
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-6 border-t border-gray-200">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-bold text-sm mb-3">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.text}>
                    <Link 
                      to={link.url} 
                      className="text-sm text-gray-600 hover:text-gray-900 hover:underline"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="pt-6 border-t border-gray-200">
          <div className="flex flex-wrap justify-between items-center">
            <p className="text-xs text-gray-500 mb-4 md:mb-0">
              &copy; {year} The New York Times Company. All Rights Reserved.
            </p>
            
            <div className="flex flex-wrap space-x-4">
              <a href="#" className="text-xs text-gray-500 hover:underline">Terms of Service</a>
              <a href="#" className="text-xs text-gray-500 hover:underline">Privacy Policy</a>
              <a href="#" className="text-xs text-gray-500 hover:underline">Cookie Policy</a>
              <a href="#" className="text-xs text-gray-500 hover:underline">California Notices</a>
              <a href="#" className="text-xs text-gray-500 hover:underline">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const MainHeader = () => {
  const { isAuthenticated, isSubscribed, openSignInModal, openSubscribeModal, logout } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 120);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header className={`bg-white transition-all duration-300 ${isSticky ? 'sticky top-0 z-50 shadow-md' : ''}`}>
      <div className="nyt-container">
        <div className="flex items-center justify-between py-3">
          {/* Mobile menu button would go here */}
          
          {/* Logo */}
          <div className="flex-1 flex justify-start">
            <Link to="/" className="flex items-center">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-serif font-bold tracking-tight">
                The New York Times
              </h1>
            </Link>
          </div>
          
          {/* Search & Auth buttons */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 hover:bg-gray-100 rounded-full"
              aria-label="Search"
            >
              {isSearchOpen ? <X size={20} /> : <Search size={20} />}
            </button>
            
            {!isAuthenticated ? (
              <>
                <button 
                  onClick={openSignInModal}
                  className="hidden md:inline-block nyt-button"
                >
                  Log In
                </button>
                <button 
                  onClick={openSubscribeModal}
                  className="nyt-button-primary"
                >
                  Subscribe
                </button>
              </>
            ) : (
              <div className="flex items-center">
                <div className="hidden md:block mr-4">
                  <div className="text-sm font-medium">
                    {isSubscribed ? 'Premium Subscriber' : 'Free Account'}
                  </div>
                </div>
                <div className="relative group">
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <User size={20} />
                  </button>
                  <div className="absolute right-0 w-48 bg-white shadow-lg rounded-md hidden group-hover:block z-50">
                    <div className="p-3 border-b border-gray-200">
                      <p className="font-medium">Account</p>
                    </div>
                    <div className="p-2">
                      <button 
                        onClick={logout}
                        className="w-full text-left p-2 text-sm hover:bg-gray-100 rounded"
                      >
                        Log Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {isSearchOpen && (
          <div className="py-3 border-t border-gray-200">
            <div className="relative">
              <input
                type="text"
                placeholder="SEARCH"
                className="w-full p-2 pr-10 border-b-2 border-gray-200 focus:border-black focus:outline-none"
              />
              <button className="absolute right-0 top-0 p-2">
                <Search size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default MainHeader;
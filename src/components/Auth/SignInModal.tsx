import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const SignInModal = () => {
  const { closeSignInModal, login, openSubscribeModal } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeSignInModal();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [closeSignInModal]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    
    // For demo purposes, any email/password will work
    login();
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-md shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-serif font-bold">Log in to The New York Times</h2>
          <button 
            onClick={closeSignInModal}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
              />
              <div className="mt-1 text-right">
                <a href="#" className="text-xs text-gray-600 hover:underline">
                  Forgot your password?
                </a>
              </div>
            </div>
            
            <button 
              type="submit"
              className="w-full py-2 bg-black text-white rounded-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Log In
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 mb-3">
              Don't have an account? 
              <button 
                onClick={() => {
                  closeSignInModal();
                  openSubscribeModal();
                }}
                className="ml-1 text-black font-medium hover:underline"
              >
                Subscribe now
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInModal;
import React, { useEffect, useState } from 'react';
import { X, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const SubscribeModal = () => {
  const { closeSubscribeModal, subscribe, openSignInModal } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('basic');
  
  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeSubscribeModal();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [closeSubscribeModal]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes, any data will work
    subscribe();
  };
  
  const plans = [
    {
      id: 'basic',
      name: 'Basic Digital Access',
      price: '$4.25',
      period: 'week',
      features: [
        'Access to all NYT articles and content',
        'NYT mobile and tablet apps',
        'The Morning newsletter',
      ]
    },
    {
      id: 'all',
      name: 'All Access',
      price: '$6.25',
      period: 'week',
      features: [
        'Everything in Basic Digital Access',
        'NYT Games (including Wordle and Crossword)',
        'NYT Cooking recipes and guides',
        'One bonus subscription to share',
      ]
    }
  ];
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-md shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-serif font-bold">Subscribe to The New York Times</h2>
          <button 
            onClick={closeSubscribeModal}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          <h3 className="text-lg font-bold mb-4">Choose your subscription</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {plans.map((plan) => (
              <div 
                key={plan.id}
                className={`border rounded-md p-4 cursor-pointer transition-all ${
                  selectedPlan === plan.id 
                    ? 'border-black ring-1 ring-black' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-bold">{plan.name}</h4>
                  <div className={`h-5 w-5 rounded-full flex items-center justify-center ${
                    selectedPlan === plan.id ? 'bg-black text-white' : 'border border-gray-300'
                  }`}>
                    {selectedPlan === plan.id && <Check size={14} />}
                  </div>
                </div>
                
                <div className="mb-3">
                  <span className="text-xl font-bold">{plan.price}</span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>
                
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <form onSubmit={handleSubmit}>
            <h3 className="text-lg font-bold mb-4">Account Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                />
              </div>
              
              <div>
                <label htmlFor="sub-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="sub-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="sub-password" className="block text-sm font-medium text-gray-700 mb-1">
                Create Password
              </label>
              <input
                id="sub-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
              />
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <button 
                type="submit"
                className="w-full md:w-auto px-6 py-2 bg-black text-white rounded-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Subscribe Now
              </button>
              
              <p className="text-sm text-gray-600">
                Already have an account? 
                <button 
                  type="button"
                  onClick={() => {
                    closeSubscribeModal();
                    openSignInModal();
                  }}
                  className="ml-1 text-black font-medium hover:underline"
                >
                  Log in
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubscribeModal;
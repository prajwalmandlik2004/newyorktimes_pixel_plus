import React, { createContext, useState, useContext, ReactNode } from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  isSubscribed: boolean;
  showSignInModal: boolean;
  showSubscribeModal: boolean;
  login: () => void;
  logout: () => void;
  subscribe: () => void;
  openSignInModal: () => void;
  closeSignInModal: () => void;
  openSubscribeModal: () => void;
  closeSubscribeModal: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
    closeSignInModal();
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsSubscribed(false);
  };

  const subscribe = () => {
    setIsSubscribed(true);
    setIsAuthenticated(true);
    closeSubscribeModal();
  };

  const openSignInModal = () => {
    setShowSignInModal(true);
    setShowSubscribeModal(false);
  };

  const closeSignInModal = () => {
    setShowSignInModal(false);
  };

  const openSubscribeModal = () => {
    setShowSubscribeModal(true);
    setShowSignInModal(false);
  };

  const closeSubscribeModal = () => {
    setShowSubscribeModal(false);
  };

  const value = {
    isAuthenticated,
    isSubscribed,
    showSignInModal,
    showSubscribeModal,
    login,
    logout,
    subscribe,
    openSignInModal,
    closeSignInModal,
    openSubscribeModal,
    closeSubscribeModal,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;
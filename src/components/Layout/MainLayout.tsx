import React from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from '../Header/TopBar';
import MainHeader from '../Header/MainHeader';
import Navigation from '../Header/Navigation';
import Footer from '../Footer/Footer';
import SignInModal from '../Auth/SignInModal';
import SubscribeModal from '../Auth/SubscribeModal';
import { useAuth } from '../../context/AuthContext';

const Layout = () => {
  const { showSignInModal, showSubscribeModal } = useAuth();
  
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <MainHeader />
      <Navigation />
      
      <main className="flex-grow">
        <Outlet />
      </main>
      
      <Footer />
      
      {showSignInModal && <SignInModal />}
      {showSubscribeModal && <SubscribeModal />}
    </div>
  );
};

export default Layout;
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './router/AppRouter';
import AuthProvider from './context/AuthContext';
import NewsProvider from './context/NewsContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <NewsProvider>
          <AppRouter />
        </NewsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
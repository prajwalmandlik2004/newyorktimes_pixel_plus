import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ArticlePage from '../pages/ArticlePage';
import CategoryPage from '../pages/CategoryPage';
import SentimentMapPage from '../pages/SentimentMapPage';
import Layout from '../components/Layout/MainLayout';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="article/:id" element={<ArticlePage />} />
        <Route path="section/:category" element={<CategoryPage />} />
        <Route path="sentiment-map" element={<SentimentMapPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
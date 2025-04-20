import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { newsData } from '../utils/newsData';
import { sentimentData } from '../utils/sentimentData';

type NewsContextType = {
  articles: Article[];
  featuredArticles: Article[];
  opinionArticles: Article[];
  categories: string[];
  currentCategory: string;
  sentimentData: SentimentData[];
  selectedSentimentCategory: string;
  loading: boolean;
  setCurrentCategory: (category: string) => void;
  setSelectedSentimentCategory: (category: string) => void;
  getArticlesByCategory: (category: string) => Article[];
};

export type Article = {
  id: string;
  title: string;
  summary: string;
  category: string;
  image?: string;
  author: string;
  date: string;
  isFeatured?: boolean;
  isOpinion?: boolean;
};

export type SentimentData = {
  country: string;
  countryCode: string;
  sentiment: {
    [key: string]: 'positive' | 'neutral' | 'negative';
  };
  headlines: {
    [key: string]: string[];
  };
};

const NewsContext = createContext<NewsContextType | undefined>(undefined);

type NewsProviderProps = {
  children: ReactNode;
};

export function NewsProvider({ children }: NewsProviderProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([]);
  const [opinionArticles, setOpinionArticles] = useState<Article[]>([]);
  const [currentCategory, setCurrentCategory] = useState('home');
  const [selectedSentimentCategory, setSelectedSentimentCategory] = useState('Politics');
  const [loading, setLoading] = useState(true);
  
  const categories = [
    'home', 'world', 'u.s.', 'politics', 'n.y.', 'business', 
    'opinion', 'tech', 'science', 'health', 'sports', 'arts', 
    'books', 'style', 'food', 'travel'
  ];

  useEffect(() => {
    // Simulate loading data
    setLoading(true);
    setTimeout(() => {
      setArticles(newsData);
      setFeaturedArticles(newsData.filter(article => article.isFeatured));
      setOpinionArticles(newsData.filter(article => article.isOpinion));
      setLoading(false);
    }, 500);
  }, []);

  const getArticlesByCategory = (category: string) => {
    if (category === 'home') {
      return articles;
    }
    return articles.filter(article => article.category.toLowerCase() === category.toLowerCase());
  };

  const value = {
    articles,
    featuredArticles,
    opinionArticles,
    categories,
    currentCategory,
    sentimentData,
    selectedSentimentCategory,
    loading,
    setCurrentCategory,
    setSelectedSentimentCategory,
    getArticlesByCategory,
  };

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
}

export const useNews = () => {
  const context = useContext(NewsContext);
  if (context === undefined) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
};

export default NewsProvider;
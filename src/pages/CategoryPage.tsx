import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNews } from '../context/NewsContext';
import ArticleCard from '../components/NewsGrid/ArticleCard';

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const { setCurrentCategory, getArticlesByCategory, loading } = useNews();
  
  useEffect(() => {
    if (category) {
      setCurrentCategory(category);
    }
  }, [category, setCurrentCategory]);
  
  const categoryArticles = category ? getArticlesByCategory(category) : [];
  
  if (loading) {
    return (
      <div className="nyt-container py-8">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 mb-4 w-3/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-60 bg-gray-200"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="nyt-container py-8">
      <h1 className="headline-xl mb-8 capitalize">{category}</h1>
      
      {categoryArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {categoryArticles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="headline-md mb-4">No articles found in this category</h2>
          <p>Please check back later for updates.</p>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
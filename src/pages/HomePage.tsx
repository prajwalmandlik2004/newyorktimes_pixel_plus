import React from 'react';
import { useNews } from '../context/NewsContext';
import MainArticle from '../components/NewsGrid/MainArticle';
import NewsSection from '../components/NewsGrid/NewsSection';
import OpinionSection from '../components/NewsGrid/OpinionSection';
import SidebarWidget from '../components/Sidebar/SidebarWidget';

const HomePage = () => {
  const { featuredArticles, opinionArticles, articles, loading } = useNews();

  if (loading) {
    return (
      <div className="nyt-container py-8">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 mb-4 w-3/4"></div>
          <div className="h-60 bg-gray-200 mb-4"></div>
          <div className="h-6 bg-gray-200 mb-2 w-1/2"></div>
          <div className="h-6 bg-gray-200 mb-2 w-1/3"></div>
        </div>
      </div>
    );
  }

  const mainArticle = featuredArticles[0] || null;
  const secondaryArticles = featuredArticles.slice(1, 3) || [];
  const remainingArticles = articles.slice(3, 9) || [];

  return (
    <div className="nyt-container py-4">
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
        {/* Main article section */}
        <section className="lg:col-span-8">
          {mainArticle && <MainArticle article={mainArticle} />}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {secondaryArticles.map(article => (
              <div key={article.id} className="border-t border-gray-200 pt-4">
                {article.image && (
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-48 object-cover mb-3"
                  />
                )}
                <h3 className="headline-md mb-2">{article.title}</h3>
                <p className="summary mb-2">{article.summary}</p>
                <p className="byline">{article.author}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-8">
            <NewsSection 
              title="Latest News" 
              articles={remainingArticles} 
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            />
          </div>
        </section>

        {/* Sidebar section */}
        <aside className="lg:col-span-4">
          <OpinionSection articles={opinionArticles} />
          
          <SidebarWidget 
            title="Most Popular" 
            items={articles.slice(10, 15).map(a => ({ title: a.title, link: `/article/${a.id}` }))} 
          />
          
          <div className="mt-6 p-4 bg-gray-100">
            <h3 className="headline-sm mb-3">Global News Sentiment Map</h3>
            <p className="summary mb-3">Explore our interactive map showing global news sentiment by category.</p>
            <a href="/sentiment-map" className="nyt-button block text-center">
              View Sentiment Map
            </a>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default HomePage;
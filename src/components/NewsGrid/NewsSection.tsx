import React from 'react';
import ArticleCard from './ArticleCard';
import { Article } from '../../context/NewsContext';

type NewsSectionProps = {
  title: string;
  articles: Article[];
  className?: string;
};

const NewsSection = ({ title, articles, className = "" }: NewsSectionProps) => {
  return (
    <section>
      <h2 className="headline-md border-b border-black pb-2 mb-6">{title}</h2>
      <div className={className}>
        {articles.map(article => (
          <ArticleCard 
            key={article.id} 
            article={article} 
            showImage={!!article.image}
          />
        ))}
      </div>
    </section>
  );
};

export default NewsSection;
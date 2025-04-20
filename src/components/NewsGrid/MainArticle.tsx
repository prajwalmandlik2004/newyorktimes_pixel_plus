import React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../../context/NewsContext';

type MainArticleProps = {
  article: Article;
};

const MainArticle = ({ article }: MainArticleProps) => {
  const { id, title, summary, author, date, image, category } = article;
  
  return (
    <article className="group">
      <Link to={`/article/${id}`} className="block">
        <div className="mb-1">
          <span className="text-xs uppercase text-gray-500 tracking-wider">{category}</span>
        </div>
        
        <h2 className="headline-xl mb-3 group-hover:text-gray-800 transition-colors">
          {title}
        </h2>
        
        {image && (
          <div className="mb-3 overflow-hidden">
            <img 
              src={image} 
              alt={title} 
              className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        
        <p className="text-xl mb-3">
          {summary}
        </p>
        
        <div className="byline">
          <span>{author}</span>
          {date && <span className="mx-1">•</span>}
          <span>{date}</span>
        </div>
      </Link>
    </article>
  );
};

export default MainArticle;
import React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../../context/NewsContext';

type ArticleCardProps = {
  article: Article;
  showImage?: boolean;
  showSummary?: boolean;
  size?: 'small' | 'medium' | 'large';
};

const ArticleCard = ({ 
  article, 
  showImage = true, 
  showSummary = true,
  size = 'medium' 
}: ArticleCardProps) => {
  const { id, title, summary, author, date, image, category } = article;
  
  const titleClass = {
    small: 'headline-xs',
    medium: 'headline-sm',
    large: 'headline-md',
  }[size];
  
  const imageClass = {
    small: 'h-32',
    medium: 'h-48',
    large: 'h-64',
  }[size];
  
  return (
    <article className="group">
      <Link to={`/article/${id}`} className="block">
        {showImage && image && (
          <div className="mb-3 overflow-hidden">
            <img 
              src={image} 
              alt={title} 
              className={`w-full ${imageClass} object-cover group-hover:scale-105 transition-transform duration-300`}
            />
          </div>
        )}
        
        <div className="mb-1">
          <span className="text-xs uppercase text-gray-500 tracking-wider">{category}</span>
        </div>
        
        <h3 className={`${titleClass} mb-2 group-hover:text-gray-700 transition-colors`}>
          {title}
        </h3>
        
        {showSummary && (
          <p className="summary mb-2">
            {summary.length > 120 ? `${summary.substring(0, 120)}...` : summary}
          </p>
        )}
        
        <div className="byline">
          <span>{author}</span>
          {date && <span className="mx-1">•</span>}
          <span>{date}</span>
        </div>
      </Link>
    </article>
  );
};

export default ArticleCard;
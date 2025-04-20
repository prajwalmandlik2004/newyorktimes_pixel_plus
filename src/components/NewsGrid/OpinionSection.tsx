import React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../../context/NewsContext';

type OpinionSectionProps = {
  articles: Article[];
};

const OpinionSection = ({ articles }: OpinionSectionProps) => {
  return (
    <section className="mb-8">
      <h2 className="headline-md border-b border-black pb-2 mb-4">Opinion</h2>
      
      <div className="space-y-5">
        {articles.map(article => (
          <article key={article.id} className="group border-b border-gray-200 pb-4">
            <Link to={`/article/${article.id}`} className="block">
              <h3 className="headline-sm mb-1 group-hover:text-gray-700 transition-colors">
                {article.title}
              </h3>
              
              <p className="summary mb-2">
                {article.summary.length > 100 ? `${article.summary.substring(0, 100)}...` : article.summary}
              </p>
              
              <div className="byline">
                <span className="font-medium">{article.author}</span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default OpinionSection;
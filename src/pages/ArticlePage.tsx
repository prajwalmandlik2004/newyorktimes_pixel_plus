import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useNews } from '../context/NewsContext';
import { useAuth } from '../context/AuthContext';
import { Clock, Share2, Bookmark, Printer } from 'lucide-react';
import SidebarWidget from '../components/Sidebar/SidebarWidget';

const ArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const { articles, loading } = useNews();
  const { isSubscribed, openSubscribeModal } = useAuth();
  
  const article = articles.find(a => a.id === id);
  
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
  
  if (!article) {
    return (
      <div className="nyt-container py-8">
        <h2 className="headline-lg mb-4">Article not found</h2>
        <Link to="/" className="nyt-button">Return to home page</Link>
      </div>
    );
  }

  // Get related articles in the same category
  const relatedArticles = articles
    .filter(a => a.category === article.category && a.id !== article.id)
    .slice(0, 5);

  return (
    <div className="nyt-container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <div className="mb-6">
            <Link to={`/section/${article.category.toLowerCase()}`} className="nyt-section-title text-gray-500">
              {article.category}
            </Link>
          </div>
          
          <h1 className="headline-xl mb-4">{article.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-gray-500 mb-6">
            <div className="flex items-center">
              <Clock size={16} className="mr-1" />
              <span>{article.date}</span>
            </div>
            
            <div className="flex gap-3 ml-auto">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Share2 size={20} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Bookmark size={20} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Printer size={20} />
              </button>
            </div>
          </div>
          
          <div className="byline mb-6">
            <p className="font-bold">By {article.author}</p>
          </div>
          
          {article.image && (
            <figure className="mb-6">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full mb-2"
              />
              <figcaption className="text-sm text-gray-500">
                A scene related to "{article.title}" (Placeholder Image)
              </figcaption>
            </figure>
          )}
          
          <div className="article-content">
            <p className="text-lg leading-relaxed mb-4">
              {article.summary}
            </p>
            
            {!isSubscribed && (
              <div className="my-8 p-6 bg-gray-100 border-t border-b border-gray-300">
                <h3 className="headline-md mb-2">Continue reading this article</h3>
                <p className="mb-4">Subscribe to continue reading this article and gain unlimited access to all of The New York Times.</p>
                <button 
                  onClick={openSubscribeModal}
                  className="nyt-button-primary w-full sm:w-auto"
                >
                  Subscribe Now
                </button>
              </div>
            )}
            
            {isSubscribed && (
              <>
                <p className="mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis varius, metus quis sodales gravida, 
                  mi lorem accumsan tellus, a pretium risus justo vel nisi. Nullam gravida purus eget eros faucibus, 
                  id finibus urna sollicitudin. Sed euismod, nisi eget aliquam fermentum, magna orci rutrum ipsum, 
                  in finibus nulla nisi ac orci.
                </p>
                <p className="mb-4">
                  Suspendisse potenti. Praesent condimentum, nulla vitae tincidunt eleifend, tortor magna vestibulum justo, 
                  ac tempus erat lacus in libero. Pellentesque sit amet fringilla urna. Proin auctor hendrerit leo, 
                  ac imperdiet lectus placerat vel. Suspendisse dapibus enim nec massa vehicula, at hendrerit enim ultrices.
                </p>
                <p className="mb-4">
                  Cras tristique tellus quis diam vehicula, eget sagittis erat tincidunt. Vestibulum maximus interdum tincidunt. 
                  Curabitur at tempus libero, in efficitur metus. Etiam sit amet faucibus velit. Nullam eget semper quam. 
                  Ut pretium commodo velit. Vivamus convallis hendrerit magna, sit amet vehicula enim gravida eu.
                </p>
              </>
            )}
          </div>
        </div>
        
        <aside className="lg:col-span-4">
          <SidebarWidget 
            title="More in News" 
            items={relatedArticles.map(a => ({ title: a.title, link: `/article/${a.id}` }))} 
          />
          
          <div className="mt-6 bg-gray-100 p-4">
            <h3 className="headline-sm mb-3">Breaking News Alerts</h3>
            <p className="summary mb-3">Get notified about breaking news when it happens.</p>
            <button className="nyt-button w-full">Sign up for alerts</button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ArticlePage;
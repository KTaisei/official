import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface BlogPost {
  id: number;
  title: string;
  content: string;
  date: string;
  readTime: string;
  image: string;
}

interface BlogPostPageProps {
  posts: BlogPost[];
  theme: string;
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ posts, theme }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const post = posts.find(p => p.id === Number(id));
  
  useEffect(() => {
    // Scroll to top when post changes
    window.scrollTo(0, 0);
    
    // If post not found, redirect to blog list
    if (!post && posts.length > 0) {
      navigate('/blog');
    }
  }, [post, posts, navigate]);
  
  if (!post) {
    return (
      <div className="py-16 text-center">
        <p className="text-xl font-mono">Post not found</p>
        <Link 
          to="/blog"
          className="inline-flex items-center mt-4 px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-mono text-sm transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>
      </div>
    );
  }
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const sharePost = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: `Check out this article: ${post.title}`,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Link copied to clipboard!'))
        .catch((error) => console.log('Error copying to clipboard', error));
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-8">
        <Link 
          to="/blog"
          className="inline-flex items-center px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-mono text-sm transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>
      </div>
      
      <article className={`rounded-lg overflow-hidden shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="relative h-64 md:h-96">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6 md:p-8">
            <h1 className="text-2xl md:text-4xl font-bold text-white font-mono mb-2">{post.title}</h1>
            <div className="flex items-center text-white/80 text-sm">
              <div className="flex items-center mr-4">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 md:p-8">
          <div className="flex justify-end mb-6">
            <button 
              onClick={sharePost}
              className="inline-flex items-center px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-mono text-sm transition-colors"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </button>
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none font-mono">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-4 font-mono">Related Posts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts
                .filter(p => p.id !== post.id)
                .slice(0, 2)
                .map(relatedPost => (
                  <Link 
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.id}`}
                    className={`block p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
                  >
                    <div className="flex items-start">
                      <img 
                        src={relatedPost.image} 
                        alt={relatedPost.title} 
                        className="w-16 h-16 object-cover rounded mr-4"
                      />
                      <div>
                        <h4 className="font-bold font-mono text-sm mb-1">{relatedPost.title}</h4>
                        <p className="text-xs text-gray-500">{relatedPost.readTime}</p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPostPage;
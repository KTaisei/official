import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface BlogPostProps {
  post: {
    id: number;
    title: string;
    content: string;
    date: string;
    readTime: string;
    image: string;
  };
  theme: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ post, theme }) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <article className={`rounded-lg overflow-hidden shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="md:flex">
        <div className="md:w-1/3">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover md:h-full"
            style={{ maxHeight: '200px' }}
          />
        </div>
        <div className="p-6 md:w-2/3">
          <h3 className="text-xl font-bold mb-2 font-mono">{post.title}</h3>
          
          <div className="flex items-center mb-3 text-sm text-gray-500">
            <div className="flex items-center mr-4">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{post.readTime}</span>
            </div>
          </div>
          
          <div className="mb-4 font-mono text-sm prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>
          
          <a 
            href="#" 
            className="inline-block px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-mono text-sm transition-colors"
          >
            Read More
          </a>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;
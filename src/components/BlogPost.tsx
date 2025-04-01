import React from "react";
import { Calendar, Clock } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <article
      className={`rounded-lg overflow-hidden shadow-lg ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}
      data-oid="tis-aki"
    >
      <div className="md:flex" data-oid="rf_1ey2">
        <div className="md:w-1/3" data-oid="_uzcyxb">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover md:h-full"
            style={{ maxHeight: "200px" }}
            data-oid="fgeifq."
          />
        </div>
        <div className="p-6 md:w-2/3" data-oid="e.7wi3.">
          <h3 className="text-xl font-bold mb-2 font-mono" data-oid="6wnfwgi">
            {post.title}
          </h3>

          <div
            className="flex items-center mb-3 text-sm text-gray-500"
            data-oid="l:1secf"
          >
            <div className="flex items-center mr-4" data-oid="e2r8at8">
              <Calendar className="h-4 w-4 mr-1" data-oid="s.82iak" />
              <span data-oid="6zqr2t8">{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center" data-oid="aiy5l6z">
              <Clock className="h-4 w-4 mr-1" data-oid="bwpdvby" />
              <span data-oid="7r.y1gz">{post.readTime}</span>
            </div>
          </div>

          <div
            className="mb-4 font-mono text-sm prose prose-sm dark:prose-invert max-w-none"
            data-oid=".yc-jen"
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]} data-oid="umrbt9y">
              {post.content}
            </ReactMarkdown>
          </div>

          <a
            href="#"
            className="inline-block px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-mono text-sm transition-colors"
            data-oid=":jte5gm"
          >
            Read More
          </a>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;
